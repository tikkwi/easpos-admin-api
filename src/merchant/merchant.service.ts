import { C_SESSION, REPOSITORY } from '@common/constant';
import { ContextService } from '@common/core/context/context.service';
import { Repository } from '@common/core/repository';
import { FindByIdDto } from '@common/dto/core.dto';
import { CreateMerchantDto, MerchantServiceMethods } from '@common/dto/merchant.dto';
import { Merchant } from '@common/schema/merchant.schema';
import { getPeriodDate, isPeriodExceed } from '@common/utils/datetime';
import { ECategory, EEntityMetadata, EMail, EStatus } from '@common/utils/enum';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AddressService } from '@shared/address/address.service';
import { CategoryService } from '@shared/category/category.service';
import { MailService } from '@shared/mail/mail.service';
import { Document } from 'mongoose';
import { AppConfigService } from 'src/app_config/app_config.service';
import { AdminMetadataService } from 'src/metadata/admin_metadata.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MerchantService implements MerchantServiceMethods {
  constructor(
    private readonly context: ContextService,
    @Inject(REPOSITORY) private readonly repository: Repository<Merchant>,
    private readonly appConfigService: AppConfigService,
    @Inject(forwardRef(() => AdminMetadataService))
    private readonly metadataService: AdminMetadataService,
    private readonly mailService: MailService,
    private readonly addressService: AddressService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async getMerchant(dto: FindByIdDto) {
    return await this.repository.findById(dto);
  }

  async merchantWithAuth({ id }: FindByIdDto) {
    const { data: appConfig } = await this.appConfigService.getConfig();
    const { data: merchant } = await this.repository.findById({
      id,
      options: { populate: 'activePurchase' },
    });
    const [subEnd, subUntil] = isPeriodExceed(
      merchant.activePurchase.subscriptionPeriod,
      merchant.activePurchase.createdAt,
    );
    const [preSubEnd] = isPeriodExceed(
      merchant.activePurchase.subscriptionPeriod,
      getPeriodDate(appConfig.preEndSubMailPeriod, new Date()),
    );
    const isSubActive =
      merchant.status === EStatus.Active &&
      merchant.activePurchase &&
      (!merchant.activePurchase.subscriptionPeriod || !subEnd);

    if (!isSubActive) {
      if (!merchant.activePurchase || merchant.status !== EStatus.Active) return;
      await this.repository.findAndUpdate({
        id: merchant._id,
        update: {
          $set: { status: EStatus.Expired, activePurchase: null },
        },
      });
    }
    if (subEnd || preSubEnd)
      this.mailService.sendMail({
        mail: merchant.mail,
        type: EMail.MerchantSubscriptionExpire,
        expirePayload: subEnd ? { expireDate: subUntil } : undefined,
        preExpirePayload: subEnd ? undefined : { expireDate: subUntil },
      });
    return { data: merchant, isSubActive };
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
