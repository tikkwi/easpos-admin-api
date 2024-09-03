import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { AppAllowanceService } from '@app/allowance/allowance.service';
import { CoreController } from '@common/core/core.controller';
import { Body, Post } from '@nestjs/common';
import { CreateAllowanceDto } from '@common/dto/service/allowance.dto';

@AppController('allowance', [EAllowedUser.Admin])
export class AppAllowanceController extends CoreController {
   constructor(protected readonly service: AppAllowanceService) {
      super();
   }

   @Post('create')
   createAllowance(@Body() dto: CreateAllowanceDto) {
      return this.service.createAllowance(dto);
   }
}
