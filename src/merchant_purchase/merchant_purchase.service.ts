import { REPOSITORY } from '@common/constant';
import { ContextService } from '@common/core/context/context.service';
import { CoreService } from '@common/core/service/core.service';
import { Repository } from '@common/core/repository';
import { AppService } from '@common/decorator/app_service.decorator';
import { MerchantPurchaseServiceMethods, SubMonitorDto } from '@common/dto/merchant_purchase.dto';
import { MerchantSubscription } from '@common/schema/merchant_subscription.schema';
import { Inject } from '@nestjs/common';
import { ESubscription } from '@common/utils/enum';
import { $dayjs, getPeriodDate } from '@common/utils/datetime';

@AppService()
export class MerchantPurchaseService extends CoreService implements MerchantPurchaseServiceMethods {
   constructor(
      protected readonly context: ContextService,
      @Inject(REPOSITORY) private readonly repository: Repository<MerchantSubscription>,
   ) {
      super();
   }

   async subMonitor({ ids }: SubMonitorDto) {
      const { data: purchases } = await this.repository.find({ filter: { _id: { $in: ids } } });

      const activePurchases = [];
      let subEnd;
      if (purchases[0].type === ESubscription.Offline)
         return { data: { purchases, isSubActive: true } };

      purchases.forEach((purchase) => {
         const purSubEnd = getPeriodDate(purchase.subscriptionPeriod, purchase.startDate);
         const isSubEnd = $dayjs().isAfter(purSubEnd);
         if (!isSubEnd) {
            subEnd = purSubEnd;
            activePurchases.push(purchase);
         }
      });

      const isSubEnd = subEnd ? $dayjs().isAfter(subEnd) : true;

      return { data: { purchases, isSubActive: !isSubEnd, subEnd } };
   }

   /*
    * TODO: Purchase
    *  1. Allow both upgrading and extending (can be both at the same time)
    *  2. Upgrading/Downgrade will also update to existing data(upgrade num_user etc)
    *  3. Change subscription type need to wait current purchase to expire
    * */
}
