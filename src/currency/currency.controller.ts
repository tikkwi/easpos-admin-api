import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { CurrencyController } from '@common/service/currency/currency.controller';
import { AppCurrencyService } from '@app/currency/currency.service';

@AppController('currency', [EAllowedUser.Admin])
export class AppCurrencyController extends CurrencyController {
   constructor(protected readonly service: AppCurrencyService) {
      super();
   }
}
