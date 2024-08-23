import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { getServiceToken } from '@utils/misc';
import { AUTH_CREDENTIAL, MERCHANT } from '@constant/model.constant';
import { AuthCredentialService } from './auth_credential/auth_credential.service';
import { CoreModule } from '@core/module/core.module';
import { MerchantModule } from './merchant/merchant.module';
import { MerchantService } from './merchant/merchant.service';
import { BasicAuthMiddleware } from '@middleware/basic_auth.middleware';
import { AuthCredentialModule } from './auth_credential/auth_credential.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@guard/auth.guard';

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
