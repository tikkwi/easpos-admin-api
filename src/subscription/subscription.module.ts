import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSubscriptionService } from './subscription.service';
import { AppSubscription, AppSubscriptionSchema } from '@app/subscription/subscription.schema';
import { getRepositoryProvider } from '@common/utils/misc';
import { AppSubscriptionController } from '@app/subscription/subscription.controller';
import { AppMailModule } from '@app/mail/mail.module';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: AppSubscription.name, schema: AppSubscriptionSchema }]),
      AppMailModule,
   ],
   controllers: [AppSubscriptionController],
   providers: [AppSubscriptionService, getRepositoryProvider({ name: AppSubscription.name })],
   exports: [AppSubscriptionService],
})
export class AppSubscriptionModule {}
