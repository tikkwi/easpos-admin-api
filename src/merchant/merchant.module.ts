import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { getGrpcClient } from '@app/helper';
import { ADDRESS, CATEGORY, MAIL, MERCHANT, METADATA, USER } from '@app/constant';
import { ClientsModule } from '@nestjs/microservices';
import { Merchant, MerchantSchema } from '@app/schema';

const [client, services] = getGrpcClient([METADATA, MAIL, ADDRESS, USER, CATEGORY]);
@Module({
  imports: [ClientsModule.register(client)],
  controllers: [MerchantController],
  providers: [
    MerchantService,
    // ...getRepositoryProviders([{ name: Merchant.name, schema: MerchantSchema }]),
    ...services,
  ],
})
export class MerchantModule {}
