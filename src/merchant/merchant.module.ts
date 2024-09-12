import { Module } from '@nestjs/common';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { getRepositoryProvider } from '@common/utils/misc';
import Merchant, { MerchantSchema } from '@common/schema/merchant.schema';
import MailModule from '@shared/mail/mail.module';
import AppConfigModule from '../config/config.module';
import MerchantGrpcController from './merchant.grpc.controller';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema }]),
      AppConfigModule,
      MailModule,
      MerchantPurchaseModule,
   ],
   controllers: [MerchantController, MerchantGrpcController],
   providers: [MerchantService, getRepositoryProvider({ name: Merchant.name })],
   exports: [MerchantService],
})
export class MerchantModule {}
