import { Module } from '@nestjs/common';
import { AuthCredentialSchema } from '@common/schema/ms/auth_credential.schema';
import AuthCredentialGrpcController from './auth_credential.grpc.controller';
import AuthCredentialService from './auth_credential.service';
import { SCHEMA } from '@common/constant';
import { AuthCredentialController } from './auth_credential.controller';

@Module({
   controllers: [AuthCredentialGrpcController, AuthCredentialController],
   providers: [AuthCredentialService, { provide: SCHEMA, useValue: AuthCredentialSchema }],
   exports: [AuthCredentialService],
})
export default class AuthCredentialModule {}
