import { Body, Get, Post } from '@nestjs/common';
import AppController from '@common/decorator/app_controller.decorator';
import { CreateMerchantDto } from '@common/dto/merchant.dto';
import CoreController from '@common/core/core.controller';
import { EAllowedUser } from '@common/utils/enum';
import MerchantService from './merchant.service';

@AppController('merchant', { admin: [EAllowedUser.Admin] })
export default class MerchantController extends CoreController {
   constructor(protected readonly service: MerchantService) {
      super();
   }

   @Post('create')
   async createMerchant(@Body() dto: CreateMerchantDto) {
      return this.service.createMerchant(dto);
   }

   @Get('test')
   test() {
      return this.service.tmpTst();
   }
}
