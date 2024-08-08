import { User, UserSchema } from '@common/schema/user.schema';
import { getRepositoryProvider } from '@common/utils/misc';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserGrpcController } from './user.grpc.controller';
import { UserService } from './user.service';
import { MerchantModule } from 'src/merchant/merchant.module';
import { AdminMetadataModule } from 'src/metadata/admin_metadata.module';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      forwardRef(() => MerchantModule),
      forwardRef(() => AdminMetadataModule),
   ],
   controllers: [UserController, UserGrpcController],
   providers: [UserService, getRepositoryProvider({ name: User.name })],
   exports: [UserService],
})
export class UserModule {}
