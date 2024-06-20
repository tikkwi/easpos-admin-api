import { GrpcHandler } from '@common/decorator';
import { AuthCredentialService } from './auth_credential.service';
import { GetAuthCredentialDto } from '@common/dto';

@GrpcHandler()
export class AuthCredentialGrpcController {
  constructor(private readonly service: AuthCredentialService) {}

  async getAuthCredential(dto: GetAuthCredentialDto) {
    this.service.getAuthCredential(dto);
  }
}
