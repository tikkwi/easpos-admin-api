import { Module, forwardRef } from '@nestjs/common';
import { MerchantModule } from 'src/merchant/merchant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@common/schema/user.schema';
import { getRepositoryProvider } from '@common/utils/misc';
import { UserController } from './user.controller';
import { UserGrpcController } from './user.grpc.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController, UserGrpcController],
  providers: [UserService, getRepositoryProvider(User.name)],
  exports: [UserService],
})
export class UserModule {}
