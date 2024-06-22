import { ADMIN_APP } from '@common/constant';
import { CoreModule } from '@common/core/core.module';
import { TransformRequestMiddleware } from '@common/middleware/transform_request.middleware';
import { getServiceToken } from '@common/utils/misc';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminAppModule } from './admin_app/admin_app.module';
import { AdminAppService } from './admin_app/admin_app.service';
import { AppConfigModule } from './app_config/app_config.module';
import { AuthCredentialModule } from './auth_credential/auth_credential.module';
import { MerchantModule } from './merchant/merchant.module';
import { UserModule } from './user/user.module';
import { AdminMetadataModule } from './metadata/admin_metadata.module';
import { TmpModule } from '@shared/tmp/tmp.module';

@Module({
  imports: [
    CoreModule,
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
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(TransformRequestMiddleware).forRoutes('*');
//   }
// }
