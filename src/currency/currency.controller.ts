import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { UnitController } from '@common/service/unit/unit.controller';
import { AppCurrencyService } from '@app/currency/currency.service';

@AppController('currency', [EAllowedUser.Admin])
export class AppCurrencyController extends UnitController {
   constructor(protected readonly service: AppCurrencyService) {
      super();
   }
}
