import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { PurchaseController } from '@common/service/purchase/purchase.controller';
import { AppPurchaseService } from '@app/purchase/purchase.service';

@AppController('purchase', [EAllowedUser.Admin])
export class AppPurchaseController extends PurchaseController {
   constructor(protected readonly service: AppPurchaseService) {
      super();
   }
}
