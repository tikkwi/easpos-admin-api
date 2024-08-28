import { AppService } from '@common/decorator/app_service.decorator';
import { PriceLevelService } from '@common/service/price_level/price_level.service';
import { ContextService } from '@common/core/context/context.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppPriceLevel } from '@app/price_level/price_level.schema';
import { GetApplicablePriceLevelDto } from '@app/price_level/price_level.dto';

@AppService()
export class AppPriceLevelService extends PriceLevelService {
   constructor(
      protected readonly context: ContextService,
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
      // const subscription = ;
      return { data: 0 };
   }
}
