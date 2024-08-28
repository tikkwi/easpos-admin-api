import { Module } from '@nestjs/common';
import { CategoryModule } from '@service/category/category.module';
import { MailModule } from '@service/mail/mail.module';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { MerchantGrpcController } from './merchant.grpc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantPurchaseModule } from '@app/subscription/subscription.module';
import { Merchant, MerchantSchema } from '@common/schema/merchant.schema';
import { AppConfigModule } from '@app/config/config.module';
import { getRepositoryProvider } from '@common/utils/misc';

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
