import { Module } from '@nestjs/common';
import { AuthCredentialService } from './auth_credential.service';
import { AuthCredentialGrpcController } from './auth_credential.grpc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthCredential, AuthCredentialSchema } from '@common/schema/auth_credential.schema';
import { getRepositoryProvider } from '@common/utils/misc';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: AuthCredential.name, schema: AuthCredentialSchema }]),
   ],
   controllers: [AuthCredentialGrpcController],
   providers: [AuthCredentialService, getRepositoryProvider({ name: AuthCredential.name })],
   exports: [AuthCredentialService],
})
export class AuthCredentialModule {}
