import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getRepositoryProvider } from '@common/utils/misc';
import AuthCredential, { AuthCredentialSchema } from '@common/schema/auth_credential.schema';
import AuthCredentialGrpcController from './auth_credential.grpc.controller';
import AuthCredentialService from './auth_credential.service';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: AuthCredential.name, schema: AuthCredentialSchema }]),
   ],
   controllers: [AuthCredentialGrpcController],
   providers: [AuthCredentialService, getRepositoryProvider({ name: AuthCredential.name })],
   exports: [AuthCredentialService],
})
export default class AuthCredentialModule {}
