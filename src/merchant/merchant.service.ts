import { C_SESSION, REPOSITORY } from '@common/constant';
import { ContextService } from '@common/core/context/context.service';
import { Repository } from '@common/core/repository';
import { FindByIdDto } from '@common/dto/core.dto';
import { CreateMerchantDto, MerchantServiceMethods } from '@common/dto/merchant.dto';
import { Merchant } from '@common/schema/merchant.schema';
import { ECategory, EEntityMetadata, EStatus } from '@common/utils/enum';
import { ForbiddenException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { AddressService } from '@shared/address/address.service';
import { CategoryService } from '@shared/category/category.service';
import { Document } from 'mongoose';
import { MerchantPurchaseService } from 'src/merchant_purchase/merchant_purchase.service';
import { AdminMetadataService } from 'src/metadata/admin_metadata.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MerchantService implements MerchantServiceMethods {
  constructor(
    @Inject(REPOSITORY) private readonly repository: Repository<Merchant>,
    @Inject(forwardRef(() => AdminMetadataService))
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly metadataService: AdminMetadataService,
    private readonly addressService: AddressService,
    private readonly categoryService: CategoryService,
    private readonly purchaseService: MerchantPurchaseService,
    private readonly context: ContextService,
  ) {}

  tmpTst(): { data: string } {
    return { data: 'You hi me..' };
  }

  async getMerchant(dto: FindByIdDto) {
    return await this.repository.findById(dto);
  }

  async merchantWithAuth({ id }: FindByIdDto) {
    const { data: merchant } = await this.repository.findById({ id });
    if (merchant.status.status === EStatus.Active) {
      const { data: isSubActive } = await this.purchaseService.subMonitor({
        id: merchant.activePurchase as any,
        merchantMail: merchant.mail,
      });
      if (isSubActive) return { merchant, isSubActive };
    }
    return { merchant: undefined, isSubActive: false };
  }

  async createMerchant({
    user: userDto,
    metadata,
    address: addressDto,
    category,
    ...dto
  }: CreateMerchantDto) {
    await this.metadataService.validateMetaValue({
      value: metadata,
      entity: EEntityMetadata.Merchant,
    });
    const { data: address } = await this.addressService.createAddress(addressDto);

    const { data: type } = category.id
      ? await this.categoryService.getCategory({ id: category.id })
      : await this.categoryService.createCategory({
          name: category.name,
          type: ECategory.Merchant,
        });

    const merchant: Document<unknown, unknown, Merchant> & Merchant = await this.repository.custom(
      async (model) =>
        new model({
          ...dto,
          status: EStatus.Pending,
          address,
          type,
          metadata,
        }),
    );

    const { data: user } = await this.userService.createUser({
      ...userDto,
      merchantId: merchant.id,
    });

    merchant.owner = user;

    return { data: await merchant.save({ session: this.context.get(C_SESSION) }) };
  }
}
