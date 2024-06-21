import { Module, forwardRef } from '@nestjs/common';
import { AddressModule } from '@shared/address/address.module';
import { MerchantModule } from 'src/merchant/merchant.module';
import { UserModule } from 'src/user/user.module';
import { AdminMetadataService } from './metadata.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Metadata, MetadataSchema } from '@common/schema/metadata.schema';
import { getRepositoryProvider } from '@common/utils/misc';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Metadata.name, schema: MetadataSchema }]),
    AddressModule,
    forwardRef(() => UserModule),
    forwardRef(() => MerchantModule),
  ],
  providers: [AdminMetadataService, getRepositoryProvider(Metadata.name)],
  exports: [AdminMetadataService],
})
export class MetadataModule {}
