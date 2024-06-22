import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { FindByIdDto } from '@common/dto/core.dto';
import { CreateUserDto, GetUserDto, UserServiceMethods } from '@common/dto/user.dto';
import { User } from '@common/schema/user.schema';
import { MetadataService } from '@common/shared/metadata/metadata.service';
import { EEntityMetadata, EUser } from '@common/utils/enum';
import { parsePath } from '@common/utils/regex';
import { BadRequestException, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
import { MerchantService } from 'src/merchant/merchant.service';
import { AdminMetadataService } from 'src/metadata/admin_metadata.service';

export class UserService implements UserServiceMethods {
  constructor(
    @Inject(REPOSITORY) private readonly repository: Repository<User>,
    @Inject(forwardRef(() => MerchantService)) private readonly merchantService: MerchantService,
    @Inject(forwardRef(() => AdminMetadataService))
    private readonly metadataService: AdminMetadataService,
  ) {}

  async getUser({ id, userName, mail, lean = true }: GetUserDto) {
    if (!id && !userName && !mail) throw new BadRequestException('Missing filter');
    return await this.repository.findOne({
      filter: { userName, mail },
      options: { lean },
    });
  }

  async userWithAuth({ id, request }: FindByIdDto) {
    return {
      data: await this.repository.custom(async (model) => {
        const service = parsePath(request.originalUrl)[1];
        return {
          data: await model.aggregate([
            { $match: { _id: id } },
            {
              $lookup: {
                from: 'userservicepermission',
                localField: 'servicePermissions',
                foreignField: '_id',
                as: 'servicePermissions',
              },
            },
            {
              $lookup: {
                from: 'merchantpurchase',
                localField: 'merchant.activePurchase',
                as: 'activePurchase',
                foreignField: '_id',
              },
            },
            {
              $addFields: {
                'merchant.activePurchase': '$activePurchase',
                isOwner: { $eq: ['$_id', id] },
              },
            },
            { $unwind: '$servicePermissions' },
            { $match: { 'servicePermissions.service': service } },
            {
              $facet: {
                serviceAllAllow: [
                  {
                    $match: {
                      $or: [{ 'merchant.owner': id }, { 'servicePermissions.allowAll': true }],
                    },
                  },
                ],
                serviceAllNotAllow: [
                  { $match: { 'servicePermissions.allowAll': false } },
                  {
                    $lookup: {
                      from: 'userservicepermission',
                      localField: 'servicePermissions.permissions',
                      foreignField: '_id',
                      as: 'permissions',
                    },
                  },
                  { $unwind: '$permissions' },
                  {
                    $match: {
                      'permissions.services': { $eleMatch: request.originalUrl },
                    },
                  },
                ],
              },
            },
            {
              $project: {
                merged: {
                  $concatArrays: ['serviceAllAllow', 'serviceAllNotAllow'],
                },
              },
            },
            { $unwind: '$merged' },
            { $replaceRoot: { newRoot: '$merged' } },
            {
              $group: {
                _id: '$_id',
                userName: { $first: '$userName' },
                type: { $first: '$type' },
                firstName: { $first: '$firstName' },
                lastName: { $first: '$lastName' },
                mail: { $first: '$mail' },
                status: { $first: '$status' },
                isOwner: { $first: '$isOwner' },
                merchant: { $first: '$merchant' },
                metadata: { $first: '$metadata' },
              },
            },
          ])[0],
        };
      }),
    };
  }

  async createUser({ merchantId, metadata: metadataValue, type, request, ...dto }: CreateUserDto) {
    let isForbidden = false;
    if (request.user) {
      if (request.user.type === EUser.Merchant) isForbidden = type === EUser.Admin;
    } else isForbidden = type !== EUser.Merchant;
    if (isForbidden) throw new ForbiddenException();
    const { data: merchant } = await this.merchantService.getMerchant({ id: merchantId, request });
    if (!merchant) throw new BadRequestException('Merchant not found');
    await this.metadataService.validateMetaValue({
      entity:
        type === EUser.Merchant
          ? EEntityMetadata.MerchantUser
          : type === EUser.Admin
            ? EEntityMetadata.Admin
            : EEntityMetadata.Customer,
      value: metadataValue,
      request,
    });
    return await this.repository.create({
      ...dto,
      type,
      merchant,
      metadata: metadataValue,
    });
  }
}
