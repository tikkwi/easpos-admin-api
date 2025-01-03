import { Module } from '@nestjs/common';
import { MerchantSchema } from '@common/schema/ms/merchant.schema';
import MerchantGrpcController from './merchant.grpc.controller';
import MerchantController from './merchant.controller';
import MerchantService from './merchant.service';
import { SCHEMA } from '@common/constant';
import AppSubscriptionModule from '../app_subscription/app_subscription.module';

@Module({
   imports: [AppSubscriptionModule],
   controllers: [MerchantController, MerchantGrpcController],
   providers: [MerchantService, { provide: SCHEMA, useValue: MerchantSchema }],
   exports: [MerchantService],
})
export class MerchantModule {}
