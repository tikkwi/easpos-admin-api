import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { AllowanceController } from '@common/service/allowance/allowance.controller';
import { AppAllowanceService } from '@app/allowance/allowance.service';

@AppController('allowance', [EAllowedUser.Admin])
export class AppAllowanceController extends AllowanceController {
   constructor(protected readonly service: AppAllowanceService) {
      super();
   }
}
