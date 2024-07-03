import { Module } from '@nestjs/common';
import { AuthCredentialModule } from 'src/auth_credential/auth_credential.module';
import { MerchantModule } from 'src/merchant/merchant.module';
import { UserModule } from 'src/user/user.module';
import { AdminAppService } from './admin_app.service';

@Module({
  imports: [UserModule, MerchantModule, AuthCredentialModule],
  providers: [AdminAppService],
  exports: [AdminAppService],
})
export class AdminAppModule {}
