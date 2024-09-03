import { AppService } from '@common/decorator/app_service.decorator';
import { PriceLevelService } from '@common/service/price_level.service';
import { ContextService } from '@common/core/context/context.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppPriceLevel } from '@app/price_level/price_level.schema';
import { AppPriceService } from '@app/price/price.service';
import { GetApplicableSubPriceDto } from '@app/price_level/price_level.dto';
import { AppPrice } from '@app/price/price.schema';

@AppService()
export class AppPriceLevelService extends PriceLevelService {
   constructor(
      protected readonly context: ContextService,
      protected readonly priceService: AppPriceService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppPriceLevel>,
   ) {
      super();
   }

   async getPrice({ addedUser, ...dto }: GetApplicableSubPriceDto) {
      const { merchant } = this.context.get('merchant');
      return await super.getPrice(
         dto,
         ({ basePrice, addedUserPrice }: AppPrice) => basePrice + addedUser * addedUserPrice,
         merchant ? merchant.totalSpend : undefined,
      );
   }
}
