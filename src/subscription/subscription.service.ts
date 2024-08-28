import { Inject } from '@nestjs/common';
import { MerchantService } from '../merchant/merchant.service';
import { AppService } from '@common/decorator/app_service.decorator';
import { CoreService } from '@common/core/service/core.service';
import { ContextService } from '@common/core/context/context.service';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppSubscription } from '@app/subscription/subscription.schema';

@AppService()
export class AppSubscriptionService extends CoreService<AppSubscription> {
   constructor(
      protected readonly context: ContextService,
      private readonly merchantService: MerchantService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppSubscription>,
   ) {
      super();
   }
}
