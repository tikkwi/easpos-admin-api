import { REPOSITORY } from '@constant/model.constant';
import { ContextService } from '@core/context/context.service';
import { CoreService } from '@core/service/core.service';
import { Repository } from '@core/repository';
import { AppService } from '@decorator/app_service.decorator';
import {
   MerchantPurchaseServiceMethods,
   PurchaseMerchantSubscriptionDto,
   SubMonitorDto,
} from '@service_dto/merchant_subscription.dto';
import { MerchantSubscription } from '@service_schema/merchant_subscription.schema';
import { Inject } from '@nestjs/common';
import { ESubscription } from '@utils/enum';
import { $dayjs, getPeriodDate } from '@utils/datetime';
import { MerchantService } from '../merchant/merchant.service';

@AppService()
export class MerchantPurchaseService extends CoreService implements MerchantPurchaseServiceMethods {
   constructor(
      protected readonly context: ContextService,
      private readonly merchantService: MerchantService,
      @Inject(REPOSITORY) private readonly repository: Repository<MerchantSubscription>,
   ) {
      super();
   }

   async subMonitor({ ids }: SubMonitorDto) {
      const { data: purchases } = await this.repository.find({ filter: { _id: { $in: ids } } });

      const activePurchases = [];
      let subEnd, offlinePurchase;

      for (const purchase of purchases) {
         if (purchase.type === ESubscription.Offline) {
            offlinePurchase = purchase;
            continue;
         }
         const purSubEnd = getPeriodDate(purchase.subscriptionPeriod, purchase.startDate);
         const isSubEnd = $dayjs().isAfter(purSubEnd);
         if (!isSubEnd) {
            subEnd = purSubEnd;
            activePurchases.push(purchase);
         }
      }

      if (offlinePurchase) activePurchases.push(offlinePurchase);
      if (activePurchases.length === 1 && offlinePurchase)
         return { data: { purchases, isSubActive: true } };

      const isSubEnd = subEnd ? $dayjs().isAfter(subEnd) : true;

      return { data: { purchases: activePurchases, isSubActive: !isSubEnd, subEnd } };
   }

   /*
    * TODO: Purchase
    *  1. Allow both upgrading and extending (can be both at the same time)
    *  2. Upgrading/Downgrade will also update to existing data(upgrade num_user etc)
    *  3. Change subscription type need to wait current purchase to expire
    * */
   async purchaseSubscription({ id, ...dto }: PurchaseMerchantSubscriptionDto) {
      const { data: merchant } = await this.merchantService.getMerchant({ id });
      const { data: prevPurchase } = await this.repository.findOne({
         filter: { merchant: merchant._id },
      });
   }
}
