import { AppController } from '@app/decorator';
import { MerchantService } from './merchant.service';
import { Body, Post, Req, Res } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { CreateMerchantDto } from '../../libs/common/src/dto/merchant.dto';

@AppController('admin-api/merchant')
export class MerchantController {
  constructor(private readonly service: MerchantService) {}

  @Post('create')
  async createMerchant(
    @Req() request: Request,
    @Res() _: Response,
    @Body() dto: Omit<CreateMerchantDto, 'request'>,
  ) {
    return this.service.createMerchant({ ...dto, request });
  }
}
