import AppController from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { CoreController } from '@common/core/core.controller';
import { AppSubscriptionService } from '@app/subscription/subscription.service';

@AppController('subscription', [EAllowedUser.Admin])
export class AppSubscriptionController extends CoreController {
   constructor(protected readonly service: AppSubscriptionService) {
      super();
   }
}
