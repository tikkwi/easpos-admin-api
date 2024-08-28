import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { AllowanceCodeController } from '@common/service/allowance_code/allowance_code.controller';
import { AppAllowanceCodeService } from '@app/allowance_code/allowance_code.service';
import { Body, Post } from '@nestjs/common';
import { CreateAllowanceCodeDto } from '@common/dto/service/allowance_code.dto';

@AppController('allowance_code', [EAllowedUser.Admin])
export class AppAllowanceCodeController extends AllowanceCodeController {
   constructor(protected readonly service: AppAllowanceCodeService) {
      super();
   }

   @Post('create')
   async createAllowanceCode(@Body() dto: CreateAllowanceCodeDto) {
      return this.service.create(dto);
   }
}
