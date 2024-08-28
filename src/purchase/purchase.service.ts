import { CoreService } from '@common/core/service/core.service';
import { Repository } from '@common/core/repository';
import { ContextService } from '@common/core/context/context.service';
import { Inject } from '@nestjs/common';
import { PRE_END_SUB_MAIL, REPOSITORY } from '@common/constant';
import { AppPurchase } from '@app/purchase/purchase.schema';
import { FindByIdDto } from '@common/dto/global/core.dto';
import { EMail, EStatus, ESubscription } from '@common/utils/enum';
import { $dayjs, getPeriodDate } from '@common/utils/datetime';
import { MerchantService } from '@app/merchant/merchant.service';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@common/service/mail/mail.service';

export class AppPurchaseService extends CoreService<AppPurchase> {
   constructor(
      protected readonly context: ContextService,
      private readonly config: ConfigService,
      private readonly mailService: MailService,
      private readonly merchantService: MerchantService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppPurchase>,
   ) {
      super();
   }

   async subMonitor({ id }: FindByIdDto) {
      const { data: merchant } = await this.merchantService.findById({
         id,
         errorOnNotFound: true,
         lean: false,
      });

      const { data: purchases } = await this.repository.find({
         filter: { merchant: id, 'status.status': EStatus.Active },
         options: { populate: 'type', lean: false },
      });

      const activePurchases: AppPurchase[] = [];
      let subEnd = false;

      for (const purchase of purchases) {
         if (purchase.type.type === ESubscription.Offline) {
            activePurchases.push(purchase);
            continue;
         }
         const purSubEnd = getPeriodDate(purchase.subscriptionPeriod, purchase.startDate);
         const isSubEnd = $dayjs().isAfter(purSubEnd);
         if (isSubEnd) {
            purchase.status = { status: EStatus.Expired };
            await purchase.save({ session: this.context.get('session') });
            subEnd = true;
         } else activePurchases.push(purchase);
      }
      merchant.activePurchases = activePurchases;
      const currentPurchase = activePurchases[0];
      const subEndDate =
         currentPurchase && currentPurchase.type.type !== ESubscription.Offline
            ? getPeriodDate(currentPurchase.subscriptionPeriod, currentPurchase.startDate)
            : undefined;
      await merchant.save({ session: this.context.get('session') });
      const preSubEnd = subEndDate
         ? $dayjs().isAfter($dayjs(subEndDate).add(this.config.get(PRE_END_SUB_MAIL), 'days'))
         : false;

      if (
         (subEnd && !currentPurchase.sentExpiredMail) ||
         (preSubEnd && !currentPurchase.sentPreExpireMail)
      )
         this.mailService.sendMail({
            mail: merchant.mail,
            type: subEnd ? EMail.MerchantSubscriptionExpire : EMail.MerchantPreSubscriptionExpire,
            expirePayload: subEnd ? { expireDate: subEndDate } : undefined,
            preExpirePayload: subEnd ? undefined : { expireDate: subEndDate },
         });

      return { data: !!activePurchases.length };
   }

   /*
    * TODO: Purchase
    *  1. Allow both upgrading and extending (can be both at the same time)
    *  2. Upgrading/Downgrade will also update to existing data(upgrade num_user etc)
    *  3. Change subscription type need to wait current purchase to expire
    * */
}
