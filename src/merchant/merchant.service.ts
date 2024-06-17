import { CoreService } from '@common/core/core.service';
import { AppService } from '@common/decorator';
import {
  AppConfigServiceMethods,
  FindByIdDto,
  UserServiceMethods,
} from '@common/dto';
import {
  CreateMerchantDto,
  MerchantServiceMethods,
} from '@common/dto/merchant.dto';
import { Merchant, MerchantSchema } from '@common/schema';
import {
  ECategory,
  EEntityMetadata,
  EMail,
  EStatus,
  getPeriodDate,
  isPeriodExceed,
} from '@common/utils';
import {
  AddressServiceMethods,
  CategoryServiceMethods,
  MailServiceMethods,
  MetadataServiceMethods,
} from '@shared/dto';

@AppService()
export class MerchantService
  extends CoreService<Merchant>
  implements MerchantServiceMethods
{
  private readonly appConfigService: AppConfigServiceMethods;
  private readonly metadataService: MetadataServiceMethods;
  private readonly mailService: MailServiceMethods;
  private readonly addressService: AddressServiceMethods;
  private readonly userService: UserServiceMethods;
  private readonly categoryService: CategoryServiceMethods;

  constructor() {
    super(Merchant.name, MerchantSchema);
  }

  async getMerchant(dto: FindByIdDto) {
    return await this.repository.findById(dto);
  }

  async merchantWithAuth({ id }: FindByIdDto) {
    const { data: appConfig } = await this.appConfigService.getConfig({});
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
      if (!merchant.activePurchase || merchant.status !== EStatus.Active)
        return;
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
    userDto,
    metadata,
    addressDto,
    category,
    ...dto
  }: CreateMerchantDto) {
    await this.metadataService.validateMetaValue({
      value: metadata,
      entity: EEntityMetadata.Merchant,
    });
    const { data: address } =
      await this.addressService.createAddress(addressDto);

    const { data: type } = category.id
      ? await this.categoryService.getCategory({ id: category.id })
      : await this.categoryService.createCategory({
          name: category.name!,
          type: ECategory.Merchant,
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
    });
    const { data } = await this.repository.findAndUpdate({
      id: merchant.id,
      update: { owner: user },
    });
    return { data };
  }
}
