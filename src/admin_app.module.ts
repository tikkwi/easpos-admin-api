import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminAppController } from './admin_app.controller';
import { AdminAppService } from './admin_app.service';
import { AppConfigModule } from './app_config/app_config.module';
import { AuthCredentialModule } from './auth_credential/auth_credential.module';
import { MerchantModule } from './merchant/merchant.module';
import { UserModule } from './user/user.module';
import { AdminTransformRequestMiddleware } from './middleware/admin_transform_request.middleware';
import { CoreModule } from '@common/core/core.module';

@Module({
  imports: [CoreModule, AppConfigModule, UserModule, MerchantModule, AuthCredentialModule],
  controllers: [AdminAppController],
  providers: [AdminAppService],
  exports: [AdminAppService],
})
export class AdminAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminTransformRequestMiddleware).forRoutes('*');
  }
}
