import { Module, forwardRef } from '@nestjs/common';
import { MerchantModule } from 'src/merchant/merchant.module';
import { MetadataModule } from 'src/metadata/metadata.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MerchantModule, forwardRef(() => MetadataModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
