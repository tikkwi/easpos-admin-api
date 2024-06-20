import { Module, forwardRef } from '@nestjs/common';
import { AddressModule } from '@shared/address/address.module';
import { CategoryModule } from '@shared/category/category.module';
import { MailModule } from '@shared/mail/mail.module';
import { AppConfigModule } from 'src/app_config/app_config.module';
import { MetadataModule } from 'src/metadata/metadata.module';
import { UserModule } from 'src/user/user.module';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { MerchantGrpcController } from './merchant.grpc.controller';

@Module({
  imports: [
    AppConfigModule,
    MailModule,
    AddressModule,
    CategoryModule,
    forwardRef(() => MetadataModule),
    forwardRef(() => UserModule),
  ],
  controllers: [MerchantController, MerchantGrpcController],
  providers: [MerchantService],
  exports: [MerchantService],
})
export class MerchantModule {}
