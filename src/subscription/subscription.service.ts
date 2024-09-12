import { Inject } from '@nestjs/common';
import { MerchantService } from '../merchant/merchant.service';
import { AppService } from '@common/decorator/app_service.decorator';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { ProductService } from '@common/service/product/product.service';
import { AppSubscription } from '@app/subscription/subscription.schema';

@AppService()
export class AppSubscriptionService extends ProductService<AppSubscription> {
   constructor(
      private readonly merchantService: MerchantService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppSubscription>,
   ) {
      super();
   }

   async createSubscription() {}
}
