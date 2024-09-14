import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getRepositoryProvider } from '@common/utils/misc';
import Merchant, { MerchantSchema } from '@common/schema/merchant.schema';
import MerchantGrpcController from './merchant.grpc.controller';
import PurchasedSubscriptionModule from '@shared/purchased_subscription/purchased_subscription.module';
import MerchantController from './merchant.controller';
import MerchantService from './merchant.service';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema }]),
      PurchasedSubscriptionModule,
   ],
   controllers: [MerchantController, MerchantGrpcController],
   providers: [MerchantService, getRepositoryProvider({ name: Merchant.name })],
   exports: [MerchantService],
})
export class MerchantModule {}
