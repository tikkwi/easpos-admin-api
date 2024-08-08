import { PRE_END_SUB_MAIL, REPOSITORY } from '@common/constant';
import { ContextService } from '@common/core/context/context.service';
import { CoreService } from '@common/core/core.service';
import { Repository } from '@common/core/repository';
import { AppService } from '@common/decorator/app_service.decorator';
import { MerchantPurchaseServiceMethods, SubMonitorDto } from '@common/dto/merchant_purchase.dto';
import { MerchantPurchase } from '@common/schema/merchant_purchase.schema';
import { getPeriodDate, isPeriodExceed } from '@common/utils/datetime';
import { EMail } from '@common/utils/enum';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@shared/mail/mail.service';

@AppService()
export class MerchantPurchaseService extends CoreService implements MerchantPurchaseServiceMethods {
   constructor(
      @Inject(REPOSITORY) private readonly repository: Repository<MerchantPurchase>,
      private readonly mailService: MailService,
      private readonly config: ConfigService,
      protected readonly context: ContextService,
   ) {
      super();
   }

   async subMonitor({ id, merchantMail }: SubMonitorDto) {
      const { data: purchase } = await this.repository.findById({ id, options: { lean: false } });

      const subEnd = purchase.subscriptionPeriod
         ? isPeriodExceed(purchase.subscriptionPeriod, purchase.createdAt)
         : undefined;

      const preSubEnd = purchase.subscriptionPeriod
         ? isPeriodExceed(
              purchase.subscriptionPeriod,
              getPeriodDate({ days: this.config.get(PRE_END_SUB_MAIL) }, new Date()),
           )
         : undefined;

      if ((subEnd && !purchase.sentSubEndMail) || (preSubEnd && !purchase.sentPreSubEndMail)) {
         this.mailService.sendMail({
            mail: merchantMail,
            type: subEnd ? EMail.MerchantSubscriptionExpire : EMail.MerchantPreSubscriptionExpire,
            expirePayload: subEnd ? { expireDate: subEnd[1] } : undefined,
            preExpirePayload: subEnd ? undefined : { expireDate: subEnd[1] },
         });
         if (subEnd) purchase.sentSubEndMail = true;
         if (preSubEnd) purchase.sentPreSubEndMail = true;
         await purchase.save({ session: this.context.get('session') });
      }

      return { data: !!subEnd };
   }
}
