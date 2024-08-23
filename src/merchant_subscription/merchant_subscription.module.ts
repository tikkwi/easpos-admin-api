import {
   MerchantSubscription,
   MerchantSubscriptionSchema,
} from '@service_schema/merchant_subscription.schema';
import { getRepositoryProvider } from '@utils/misc';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantPurchaseService } from './merchant_subscription.service';
import { MailModule } from '@shared/mail/mail.module';

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: MerchantSubscription.name, schema: MerchantSubscriptionSchema },
      ]),
      MailModule,
   ],
   providers: [MerchantPurchaseService, getRepositoryProvider({ name: MerchantSubscription.name })],
   exports: [MerchantPurchaseService],
})
export class MerchantPurchaseModule {}
