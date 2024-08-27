import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantPurchaseService } from './subscription.service';
import { MailModule } from '@service/mail/mail.module';
import {
   MerchantSubscription,
   MerchantSubscriptionSchema,
} from '@app/subscription/subscription.schema';
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
