import { Module, forwardRef } from '@nestjs/common';
import { MerchantModule } from 'src/merchant/merchant.module';
import { MetadataModule } from 'src/metadata/metadata.module';
import { AdminUserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@common/schema/user.schema';
import { UserController } from '@common/shared/user/user.controller';
import { UserGrpcController } from '@common/shared/user/user.grpc.controller';
import { getRepositoryProvider } from '@common/utils/misc';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => MerchantModule),
    forwardRef(() => MetadataModule),
  ],
  controllers: [UserController, UserGrpcController],
  providers: [AdminUserService, getRepositoryProvider(User.name)],
  exports: [AdminUserService],
})
export class UserModule {}
