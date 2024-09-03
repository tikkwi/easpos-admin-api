import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { AppAllowanceCodeService } from '@app/allowance_code/allowance_code.service';
import { Body, Post } from '@nestjs/common';
import { CreateAllowanceCodeDto } from '@common/dto/service/allowance_code.dto';
import { CoreController } from '@common/core/core.controller';

@AppController('allowance_code', [EAllowedUser.Admin])
export class AppAllowanceCodeController extends CoreController {
   constructor(protected readonly service: AppAllowanceCodeService) {
      super();
   }

   @Post('create')
   async createAllowanceCode(@Body() dto: CreateAllowanceCodeDto) {
      return this.service.createAllowanceCode(dto);
   }
}
