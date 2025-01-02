import { Module } from '@nestjs/common';
import SubscriptionService from './subscription.service';
import MailModule from '@shared/mail/mail.module';

@Module({
   imports: [MailModule],
   providers: [SubscriptionService],
   exports: [SubscriptionService],
})
export default class SubscriptionModule {}
