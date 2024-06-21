import { Body, Post } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CoreController } from '@common/core/core.controller';
import { C_REQ } from '@common/constant';
import { AppController } from '@common/decorator/app_controller.decorator';
import { CreateMerchantDto } from '@common/dto/merchant.dto';

@AppController('merchant')
export class MerchantController extends CoreController<MerchantService> {
  @Post('create')
  async createMerchant(@Body() dto: Omit<CreateMerchantDto, 'request'>) {
    return this.service.createMerchant({ ...dto, request: this.context.get(C_REQ) });
  }
}
