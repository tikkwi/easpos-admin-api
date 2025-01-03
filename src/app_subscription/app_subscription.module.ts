import { Module } from '@nestjs/common';
import AppSubscriptionService from './app_subscription.service';
import MailModule from '@shared/mail/mail.module';

@Module({
   imports: [MailModule],
   providers: [AppSubscriptionService],
   exports: [AppSubscriptionService],
})
export default class AppSubscriptionModule {}
