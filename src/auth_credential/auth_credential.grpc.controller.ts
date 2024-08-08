import { GrpcHandler } from '@common/decorator/grpc_handler.decorator';
import { AuthCredentialService } from './auth_credential.service';
import { GetAuthCredentialDto } from '@common/dto/auth_credential.dto';

@GrpcHandler()
export class AuthCredentialGrpcController {
   constructor(private readonly service: AuthCredentialService) {}

   async getAuthCredential(dto: GetAuthCredentialDto) {
      this.service.getAuthCredential(dto);
   }
}
