import { ADMIN_APP } from '@common/constant';
import { TransformRequestMiddleware } from '@common/middleware/transform_request.middleware';
import { getServiceToken } from '@common/utils/misc';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TmpModule } from '@shared/tmp/tmp.module';
import { AdminAppModule } from './admin_app/admin_app.module';
import { AdminAppService } from './admin_app/admin_app.service';
import { AppConfigModule } from './app_config/app_config.module';
import { AuthCredentialModule } from './auth_credential/auth_credential.module';
import { MerchantModule } from './merchant/merchant.module';
import { AdminMetadataModule } from './metadata/admin_metadata.module';
import { UserModule } from './user/user.module';
import { CoreHttpModule } from '@common/core/core_http.module';
import { CoreModule } from '@common/core/core.module';

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
  providers: [{ provide: getServiceToken(ADMIN_APP), useExisting: AdminAppService }],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransformRequestMiddleware).forRoutes('*');
  }
}
