import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { AppPurchaseService } from '@app/purchase/purchase.service';
import { CoreController } from '@common/core/core.controller';

@AppController('purchase', [EAllowedUser.Admin])
export class AppPurchaseController extends CoreController {
   constructor(protected readonly service: AppPurchaseService) {
      super();
   }
}
