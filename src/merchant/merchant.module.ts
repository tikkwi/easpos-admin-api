import { Module } from '@nestjs/common';
import { MerchantSchema } from '@common/schema/merchant.schema';
import MerchantGrpcController from './merchant.grpc.controller';
import MerchantController from './merchant.controller';
import MerchantService from './merchant.service';
import { SCHEMA } from '@common/constant';
import SubscriptionModule from '../subscription/subscription.module';

@Module({
   imports: [SubscriptionModule],
   controllers: [MerchantController, MerchantGrpcController],
   providers: [MerchantService, { provide: SCHEMA, useValue: MerchantSchema }],
   exports: [MerchantService],
})
export class MerchantModule {}
