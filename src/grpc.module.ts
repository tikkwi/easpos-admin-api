import { CoreModule } from '@common/core/core.module';
import { Module } from '@nestjs/common';
import { MerchantModule } from './merchant/merchant.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CoreModule, MerchantModule, UserModule],
})
export class GrpcModule {}
