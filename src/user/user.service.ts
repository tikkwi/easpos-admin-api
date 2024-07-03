import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { FindByIdDto } from '@common/dto/core.dto';
import { AuthUser } from '@common/dto/entity.dto';
import { CreateUserDto, GetUserDto, UserServiceMethods } from '@common/dto/user.dto';
import { User } from '@common/schema/user.schema';
import { getPeriodDate } from '@common/utils/datetime';
import { EEntityMetadata, EUser } from '@common/utils/enum';
import { BadRequestException, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
import { pick } from 'lodash';
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
      filter: { $or: [{ _id: id }, { userName }, { mail }] },
      options: { lean },
    });
  }

  async getAuthUser({ id }: FindByIdDto): Promise<{ data: AuthUser }> {
    const { data: user } = await this.repository.findById({
      id,
      options: {
        populate: [
          { path: 'merchant', populate: 'activePurchase' },
          { path: 'servicePermissions', populate: 'permissions' },
        ],
      },
    });
    const subEndPeriod = user.merchant.activePurchase?.subscriptionPeriod;
    return {
      data: {
        ...pick(user, ['id', 'userName', 'firstName', 'type', 'firstName', 'lastName', 'mail']),
        isOwner: user.merchant.owner.equals(id),
        userStatus: user.status.status,
        servicePermissions: user.servicePermissions?.reduce((acc, cur) => {
          const permissions = cur.permissions ? { urls: [], auxillaryServices: [] } : undefined;
          cur.permissions?.forEach(({ url, auxillaryService }) => {
            permissions.urls.push(url);
            permissions.auxillaryServices.push(auxillaryService);
          });
          acc.push({ service: cur.service, permissions });
          return acc;
        }, []),
        merchant: user.merchant._id as any,
        merchantSubType: user.merchant.subscriptionType,
        merchantStatus: user.merchant.status.status,
        merchantEndSub: subEndPeriod
          ? getPeriodDate(subEndPeriod, user.merchant.activePurchase.createdAt)
          : undefined,
      },
    };
  }

  //TODO: user permissions
  async createUser({
    authUser,
    metadata: metadataValue,
    type,
    merchantId,
    permissions,
    ...dto
  }: CreateUserDto) {
    const isAdmin = type === EUser.Admin;

    if (
      (isAdmin && authUser?.type !== EUser.Admin) ||
      (authUser?.type === EUser.Customer && type !== EUser.Customer)
    )
      throw new ForbiddenException();

    if (!isAdmin && !merchantId) throw new BadRequestException('Merchant is required');

    const merchant: any = isAdmin
      ? undefined
      : merchantId ?? (await this.merchantService.getMerchant({ id: merchantId })).data;
    if (!isAdmin && !merchant) throw new BadRequestException('Merchant not found');

    await this.metadataService.validateMetaValue({
      entity:
        type === EUser.Merchant
          ? EEntityMetadata.MerchantUser
          : type === EUser.Admin
            ? EEntityMetadata.Admin
            : EEntityMetadata.Customer,
      value: metadataValue,
    });

    return await this.repository.create({
      ...dto,
      type,
      merchant,
      metadata: metadataValue,
    });
  }
}
