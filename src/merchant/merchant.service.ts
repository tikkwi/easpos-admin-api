import { CoreService } from '@common/core/core.service';
import { AppService } from '@common/decorator/app_service.decorator';
import { AppConfigServiceMethods } from '@common/dto/app_config.dto';
import { FindByIdDto } from '@common/dto/core.dto';
import { CreateMerchantDto, MerchantServiceMethods } from '@common/dto/merchant.dto';
import { MetadataServiceMethods } from '@common/dto/metadata.dto';
import { UserServiceMethods } from '@common/dto/user.dto';
import { getPeriodDate, isPeriodExceed } from '@common/utils/datetime';
import { ECategory, EEntityMetadata, EMail, EStatus } from '@common/utils/enum';
import { AddressServiceMethods } from '@shared/address/address.dto';
import { CategoryServiceMethods } from '@shared/category/category.dto';
import { MailServiceMethods } from '@shared/mail/mail.dto';

@AppService()
export class MerchantService extends CoreService<Merchant> implements MerchantServiceMethods {
  private readonly appConfigService: AppConfigServiceMethods;
  private readonly metadataService: MetadataServiceMethods;
  private readonly mailService: MailServiceMethods;
  private readonly addressService: AddressServiceMethods;
  private readonly userService: UserServiceMethods;
  private readonly categoryService: CategoryServiceMethods;

  async getMerchant(dto: FindByIdDto) {
    return await this.repository.findById(dto);
  }

  async merchantWithAuth({ id, request }: FindByIdDto) {
    const { data: appConfig } = await this.appConfigService.getConfig({ request });
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
        request,
      });
    return { data: merchant, isSubActive };
  }

  async createMerchant({
    userDto,
    metadata,
    addressDto,
    category,
    request,
    ...dto
  }: CreateMerchantDto) {
    await this.metadataService.validateMetaValue({
      value: metadata,
      entity: EEntityMetadata.Merchant,
      request,
    });
    const { data: address } = await this.addressService.createAddress({ ...addressDto, request });

    const { data: type } = category.id
      ? await this.categoryService.getCategory({ id: category.id, request })
      : await this.categoryService.createCategory({
          name: category.name!,
          type: ECategory.Merchant,
          request,
        });

    const { data: merchant } = await this.repository.create({
      ...dto,
      status: EStatus.Pending,
      address,
      type,
      metadata,
    });

    const { data: user } = await this.userService.createUser({
      ...userDto,
      merchantId: merchant.id,
      request,
    });
    const { data } = await this.repository.findAndUpdate({
      id: merchant.id,
      update: { owner: user },
    });
    return { data };
  }
}
