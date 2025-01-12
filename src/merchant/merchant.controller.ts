import { Get } from '@nestjs/common';
import AppController from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import MerchantService from './merchant.service';

@AppController('merchant', { admin: [EAllowedUser.Admin] })
export default class MerchantController {
   constructor(protected readonly service: MerchantService) {}

   @Get('test')
   test() {
      return this.service.tmpTst();
   }
}
