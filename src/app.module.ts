import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MerchantModule } from './merchant/merchant.module';
import { APP_GUARD } from '@nestjs/core';
import { getServiceToken } from '@common/utils/misc';
import { AUTH_CREDENTIAL, MERCHANT } from '@common/constant';
import CoreModule from '@common/core/module/core.module';
import AuthCredentialModule from './auth_credential/auth_credential.module';
import AuthCredentialService from './auth_credential/auth_credential.service';
import MerchantService from './merchant/merchant.service';
import AuthGuard from '@common/guard/auth.guard';
import BasicAuthMiddleware from '@common/middleware/basic_auth.middleware';

@Module({
   imports: [CoreModule, AuthCredentialModule, MerchantModule],
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
      consumer
         .apply(BasicAuthMiddleware)
         .forRoutes('/^.*/swagger$/', '/^.*/login$/', '/^.*/register$/');
   }
}
