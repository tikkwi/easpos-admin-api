import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MerchantModule } from './merchant/merchant.module';
import { AUTH_CREDENTIAL, MERCHANT } from '@common/constant';
import CoreModule from '@common/core/module/core.module';
import AuthCredentialModule from './auth_credential/auth_credential.module';
import AuthCredentialService from './auth_credential/auth_credential.service';
import AppSubscriptionModule from './app_subscription/app_subscription.module';
import MailModule from '@shared/mail/mail.module';
import CoreHttpModule from '@common/core/module/core_http.module';
import { getServiceToken } from '@common/utils/regex';
import MerchantService from './merchant/merchant.service';
import { APP_GUARD } from '@nestjs/core';
import AuthGuard from '@common/guard/auth.guard';

@Module({
   // imports: [CoreModule, AuthCredentialModule, MailModule, App_subscriptionModule, MerchantModule],
   imports: [
      CoreModule,
      CoreHttpModule,
      AuthCredentialModule,
      MailModule,
      AppSubscriptionModule,
      MerchantModule,
   ],
   providers: [
      {
         provide: getServiceToken(AUTH_CREDENTIAL),
         useExisting: AuthCredentialService,
      },
      { provide: getServiceToken(MERCHANT), useExisting: MerchantService },
      { provide: APP_GUARD, useClass: AuthGuard },
   ],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer): any {
      // consumer
      //    .apply(BasicAuthMiddleware)
      //    .forRoutes('/^.*/swagger$/', '/^.*/login$/', '/^.*/register$/');
   }
}
