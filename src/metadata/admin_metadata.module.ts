import { getRepositoryProvider } from '@common/utils/misc';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from '@shared/address/address.module';
import { AdminMetadataService } from './admin_metadata.service';
import { Metadata, MetadataSchema } from '@common/schema/metadata.schema';
import { MerchantModule } from 'src/merchant/merchant.module';
import { UserModule } from 'src/user/user.module';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Metadata.name, schema: MetadataSchema }]),
      AddressModule,
      forwardRef(() => MerchantModule),
      forwardRef(() => UserModule),
   ],
   providers: [AdminMetadataService, getRepositoryProvider({ name: Metadata.name })],
   exports: [AdminMetadataService],
})
export class AdminMetadataModule {}
