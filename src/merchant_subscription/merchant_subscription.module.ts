import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantPurchaseService } from './merchant_subscription.service';
import { MailModule } from '@shared/mail/mail.module';
import {
   MerchantSubscription,
   MerchantSubscriptionSchema,
} from '@common/schema/service/merchant_subscription.schema';
import { getRepositoryProvider } from '@common/utils/misc';

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
