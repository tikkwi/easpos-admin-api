import { Module, forwardRef } from '@nestjs/common';
import { AddressModule } from '@shared/address/address.module';
import { MerchantModule } from 'src/merchant/merchant.module';
import { UserModule } from 'src/user/user.module';
import { AdminMetadataService } from './metadata.service';

@Module({
  imports: [AddressModule, forwardRef(() => UserModule), forwardRef(() => MerchantModule)],
  providers: [AdminMetadataService],
  exports: [AdminMetadataService],
})
export class MetadataModule {}
