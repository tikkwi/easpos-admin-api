import { AppService } from '@common/decorator/app_service.decorator';
import { PriceService } from '@common/service/price.service';
import { AppPrice } from '@app/price/price.schema';
import { AppCategoryService } from '@app/category/category.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppSubscriptionService } from '@app/subscription/subscription.service';

@AppService()
export class AppPriceService extends PriceService<AppPrice> {
   constructor(
      protected readonly productService: AppSubscriptionService,
      protected readonly categoryService: AppCategoryService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppPrice>,
   ) {
      super();
   }
}
