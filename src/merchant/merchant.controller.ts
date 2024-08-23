import { AppController } from '@decorator/app_controller.decorator';
import { CreateMerchantDto } from '@service_dto/merchant.dto';
import { Body, Get, Post } from '@nestjs/common';
import { MerchantService } from './merchant.service';

@AppController('merchant')
export class MerchantController {
   constructor(private readonly service: MerchantService) {}

   @Post('create')
   async createMerchant(@Body() dto: CreateMerchantDto) {
      return this.service.createMerchant(dto);
   }

   @Get('test')
   test() {
      return this.service.tmpTst();
   }
}
