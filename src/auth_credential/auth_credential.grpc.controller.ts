import { GrpcHandler } from '@app/decorator';
import { AuthCredentialService } from './auth_credential.service';
import { GetAuthCredentialDto } from './auth_credentila.dto';

@GrpcHandler()
export class AuchCredentialGrpcController {
  constructor(private readonly service: AuthCredentialService) {}

  async getAuthCredential(dto: GetAuthCredentialDto) {
    this.service.getAuthCredential(dto);
  }
}
