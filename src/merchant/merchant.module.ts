import { Module } from '@nestjs/common';
import { CategoryModule } from '@shared/category/category.module';
import { MailModule } from '@shared/mail/mail.module';
import { AppConfigModule } from 'src/app_config/app_config.module';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { MerchantGrpcController } from './merchant.grpc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from '@common/schema/merchant.schema';
import { getRepositoryProvider } from '@common/utils/misc';
import { UserModule } from 'src/user/user.module';
import { MerchantPurchaseModule } from 'src/merchant_purchase/merchant_purchase.module';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema }]),
      AppConfigModule,
      MailModule,
      CategoryModule,
      UserModule,
      MerchantPurchaseModule,
   ],
   controllers: [MerchantController, MerchantGrpcController],
   providers: [MerchantService, getRepositoryProvider({ name: Merchant.name })],
   exports: [MerchantService],
})
export class MerchantModule {}
