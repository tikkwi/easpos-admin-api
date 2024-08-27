import { Inject } from '@nestjs/common';
import { MerchantService } from '../merchant/merchant.service';
import { AppService } from '@common/decorator/app_service.decorator';
import { CoreService } from '@common/core/service/core.service';
import {
   MerchantPurchaseServiceMethods,
   PurchaseMerchantSubscriptionDto,
   SubMonitorDto,
} from '@common/dto/service/merchant_subscription.dto';
import { ContextService } from '@common/core/context/context.service';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { MerchantSubscription } from '@app/subscription/subscription.schema';
import { ESubscription } from '@common/utils/enum';
import { $dayjs, getPeriodDate } from '@common/utils/datetime';

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
