import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppAddress, AppAddressSchema } from '@app/address/address.schema';
import { AppAddressService } from '@app/address/address.service';
import { getRepositoryProvider } from '@common/utils/misc';
import { AppAddressController } from '@app/address/address.controller';

@Module({
   imports: [MongooseModule.forFeature([{ name: AppAddress.name, schema: AppAddressSchema }])],
   providers: [AppAddressService, getRepositoryProvider({ name: AppAddress.name })],
   controllers: [AppAddressController],
})
export class AddressModule {}
