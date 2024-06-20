import { Module } from '@nestjs/common';
import { AuthCredentialService } from './auth_credential.service';
import { AuthCredentialGrpcController } from './auth_credential.grpc.controller';

@Module({
  controllers: [AuthCredentialGrpcController],
  providers: [AuthCredentialService],
  exports: [AuthCredentialService],
})
export class AuthCredentialModule {}
