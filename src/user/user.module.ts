import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getGrpcClient } from '@common/helper';
import { MERCHANT, METADATA } from '@common/constant';
import { ClientsModule } from '@nestjs/microservices';
import { User, UserSchema } from '@common/schema';

const [client, services] = getGrpcClient([MERCHANT, METADATA]);
@Module({
  imports: [ClientsModule.register(client)],
  controllers: [UserController],
  providers: [
    UserService,
    // ...getRepositoryProviders([{ name: User.name, schema: UserSchema }]),
    ...services,
  ],
})
export class UserModule {}
