import { AppService } from '@common/decorator/app_service.decorator';
import { PriceLevelService } from '@common/service/price_level/price_level.service';
import { ContextService } from '@common/core/context/context.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppPriceLevel } from '@app/price_level/price_level.schema';
import { GetApplicablePriceLevelDto, GetLevelAllowanceDto } from '@app/price_level/price_level.dto';
import { AppSubscriptionService } from '@app/subscription/subscription.service';
import { EPrice, EStatus, ESubscription } from '@common/utils/enum';
import { AppCurrencyService } from '@app/currency/currency.service';
import { AppCategoryService } from '@app/category/category.service';

@AppService()
export class AppPriceLevelService extends PriceLevelService {
   constructor(
      protected readonly context: ContextService,
      private readonly subscriptionService: AppSubscriptionService,
      private readonly currencyService: AppCurrencyService,
      private readonly categoryService: AppCategoryService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppPriceLevel>,
   ) {
      super();
   }

   async getPrice({
      currencyId,
      paymentMethodId,
      subscriptionId,
      addedUser,
   }: GetApplicablePriceLevelDto) {
      const { data: subscription } = await this.subscriptionService.findById({
         id: subscriptionId,
         errorOnNotFound: true,
      });
      const { data: priceLevels } = await this.repository.find({
         filter: { subscription: subscriptionId, 'status.status': EStatus.Active },
      });
      const { data: paymentMethod } = await this.categoryService.findById({
         id: paymentMethodId,
         errorOnNotFound: true,
      });
      const { data: currency } = await this.currencyService.findById({
         id: currencyId,
         errorOnNotFound: true,
      });
      const price =
         subscription.basePrice +
         ([ESubscription.Dedicated, ESubscription.SharedSubscription].includes(subscription.type) &&
         addedUser
            ? addedUser * subscription.addedUserPrice
            : 0);

      if (priceLevels) {
         let aPercent = 0,
            aAmount = 0;
         priceLevels.sort((a, b) => b.priority - a.priority);
         const allowanceDto = {
            currency,
            paymentMethod,
            price,
            level: priceLevels.splice(0, 1)[0],
         };

         const getAllowance = async () => {
            const { amount, percentage } = await this.getLevelAllowance(allowanceDto);
            if (percentage) aPercent += amount;
            else aAmount += amount;
         };

         await getAllowance();
         for (const lvl of priceLevels) {
            if (lvl.stackable) {
               allowanceDto.level = lvl;
               await getAllowance();
            }
         }

         return { data: (price - aAmount) * (aPercent / 100 || 1) };
      } else return { data: price };
   }

   protected async getLevelAllowance({
      currency,
      paymentMethod,
      price,
      level,
   }: GetLevelAllowanceDto) {
      const res = { percentage: false, amount: 0 };
      let applicable = false;

      switch (level.type) {
         case EPrice.SpendBase:
            applicable = price > level.spendTriggerAmount;
            break;
         case EPrice.TotalSpendBase:
            break;
         case EPrice.PaymentMethod:
            applicable = (level.paymentMethod as any).equals(paymentMethod._id);
            break;
         case EPrice.Currency:
            applicable = (level.currency as any).equals(currency._id);
            break;
      }

      if (applicable) {
         res.percentage = level.percentage;
         res.amount = level.amount;
      }

      return res;
   }
}
