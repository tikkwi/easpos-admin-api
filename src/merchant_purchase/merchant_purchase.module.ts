import { MerchantPurchase, MerchantPurchaseSchema } from '@common/schema/merchant_purchase.schema';
import { getRepositoryProvider } from '@common/utils/misc';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantPurchaseService } from './merchant_purchase.service';
import { MailModule } from '@shared/mail/mail.module';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: MerchantPurchase.name, schema: MerchantPurchaseSchema }]),
      MailModule,
   ],
   providers: [MerchantPurchaseService, getRepositoryProvider({ name: MerchantPurchase.name })],
   exports: [MerchantPurchaseService],
})
export class MerchantPurchaseModule {}
