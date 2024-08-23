import { Module } from '@nestjs/common';
import { AuthCredentialService } from './auth_credential.service';
import { AuthCredentialGrpcController } from './auth_credential.grpc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthCredential, AuthCredentialSchema } from '@service_schema/auth_credential.schema';
import { getRepositoryProvider } from '@utils/misc';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: AuthCredential.name, schema: AuthCredentialSchema }]),
   ],
   controllers: [AuthCredentialGrpcController],
   providers: [AuthCredentialService, getRepositoryProvider({ name: AuthCredential.name })],
   exports: [AuthCredentialService],
})
export class AuthCredentialModule {}
