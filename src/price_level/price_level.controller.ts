import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { AppPriceLevelService } from '@app/price_level/price_level.service';
import { CoreController } from '@common/core/core.controller';
import { Get, Param } from '@nestjs/common';
import { GetApplicableSubPriceDto } from '@app/price_level/price_level.dto';

@AppController('price_level', [EAllowedUser.Admin])
export class AppPriceLevelController extends CoreController {
   constructor(protected readonly service: AppPriceLevelService) {
      super();
   }

   @Get('get-price/:id')
   async getPrice(@Param() dto: GetApplicableSubPriceDto) {
      return this.service.getPrice(dto);
   }
}
