import { Module } from '@nestjs/common';
import { CategoryModule } from '@shared/category/category.module';
import { MailModule } from '@shared/mail/mail.module';
import { AppConfigModule } from 'src/app_config/app_config.module';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { MerchantGrpcController } from './merchant.grpc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { getRepositoryProvider } from '@utils/misc';
import { MerchantPurchaseModule } from '../merchant_subscription/merchant_subscription.module';
import { Merchant, MerchantSchema } from '@service_schema/merchant.schema';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema }]),
      AppConfigModule,
      MailModule,
      CategoryModule,
      MerchantPurchaseModule,
   ],
   controllers: [MerchantController, MerchantGrpcController],
   providers: [MerchantService, getRepositoryProvider({ name: Merchant.name })],
   exports: [MerchantService],
})
export class MerchantModule {}
