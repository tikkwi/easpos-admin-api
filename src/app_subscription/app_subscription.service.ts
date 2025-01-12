import { $dayjs } from '@common/utils/datetime';
import MailService from '@shared/mail/mail.service';
import { EMail, EStatus } from '@common/utils/enum';
import { Injectable } from '@nestjs/common';
import BaseService from '@common/core/base/base.service';
import AppSubscription from '@common/schema/ms/app_subscription.schema';
import { FindByIdDto } from '@common/dto/core.dto';

@Injectable()
export default class AppSubscriptionService extends BaseService<AppSubscription> {
   constructor(private readonly mailService: MailService) {
      super();
   }

   async subMonitor({ ctx, id }: FindByIdDto) {
      const repository = await this.getRepository(ctx.connection, ctx.session);
      const { data: subscription } = await repository.findOne({
         filter: {
            merchant: id,
            status: EStatus.Active,
         },
         errorOnNotFound: true,
         options: { lean: false },
         projection: ['merchant', 'subscriptionType'],
      });
      if (subscription.endDate) {
         const isExpire = $dayjs().isAfter(subscription.endDate);
         const isPreExpire = $dayjs().isAfter(
            $dayjs(subscription.endDate).add(subscription.subscriptionType.preSubEndMail, 'days'),
         );

         if (isExpire) subscription.status = EStatus.Expired;

         if (
            (isExpire && !subscription.sentExpiredMail) ||
            (isPreExpire && !subscription.sentPreExpiredMail)
         ) {
            this.mailService.sendMail({
               mail: subscription.merchant.mail,
               type: isPreExpire
                  ? EMail.MerchantPreSubscriptionExpire
                  : EMail.MerchantSubscriptionExpire,
               expirePayload: isPreExpire ? undefined : { expireAt: subscription.endDate },
               preExpirePayload: isPreExpire ? { expireAt: subscription.endDate } : undefined,
            });
            if (isPreExpire) subscription.sentPreExpiredMail = true;
            else subscription.sentExpiredMail = true;
            await subscription.save({ session: ctx.session });
         }
      }
      return { data: subscription };
   }
}
