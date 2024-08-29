import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { PriceLevelController } from '@common/service/price_level/price_level.controller';
import { AppPriceLevelService } from '@app/price_level/price_level.service';

@AppController('price_level', [EAllowedUser.Admin])
export class AppPriceLevelController extends PriceLevelController {
   constructor(protected readonly service: AppPriceLevelService) {
      super();
   }
}
