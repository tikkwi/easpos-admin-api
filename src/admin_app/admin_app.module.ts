import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/app_config/app_config.module';
import { AuthCredentialModule } from 'src/auth_credential/auth_credential.module';
import { MerchantModule } from 'src/merchant/merchant.module';
import { AdminAppService } from './admin_app.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AppConfigModule, UserModule, MerchantModule, AuthCredentialModule],
  providers: [AdminAppService],
  exports: [AdminAppService],
})
export class AdminAppModule {}
