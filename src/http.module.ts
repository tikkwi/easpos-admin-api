import { AUTH_CREDENTIAL, MERCHANT } from '@common/constant';
import { CoreHttpModule } from '@common/core/core_http.module';
import { BasicAuthMiddleware } from '@common/middleware/basic_auth.middleware';
import { getServiceToken } from '@common/utils/misc';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TmpModule } from '@shared/tmp/tmp.module';
import { AdminAppModule } from './admin_app/admin_app.module';
import { AppConfigModule } from './app_config/app_config.module';
import { AuthCredentialModule } from './auth_credential/auth_credential.module';
import { AuthCredentialService } from './auth_credential/auth_credential.service';
import { MerchantModule } from './merchant/merchant.module';
import { MerchantService } from './merchant/merchant.service';
import { AdminMetadataModule } from './metadata/admin_metadata.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@common/guard/auth.guard';

@Module({
   imports: [
      CoreHttpModule,
      AdminAppModule,
      AppConfigModule,
      AuthCredentialModule,
      MerchantModule,
      AdminMetadataModule,
      UserModule,
      TmpModule,
   ],
   providers: [
      { provide: getServiceToken(MERCHANT), useExisting: MerchantService },
      { provide: getServiceToken(AUTH_CREDENTIAL), useExisting: AuthCredentialService },
      { provide: APP_GUARD, useClass: AuthGuard },
   ],
})
export class HttpModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer
         .apply(BasicAuthMiddleware)
         .forRoutes('/^.*/swagger$/', '/^.*/login$/', '/^.*/register$/');
   }
}
