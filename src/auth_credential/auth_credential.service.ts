import { CoreService } from '@common/core/core.service';
import { AppService } from '@common/decorator/app_service.decorator';
import {
  AuthCredentialServiceMethods,
  GetAuthCredentialDto,
} from '@common/dto/auth_credential.dto';
import { AuthCredential } from '@common/schema/auth_credential.schema';

@AppService()
export class AuthCredentialService
  extends CoreService<AuthCredential>
  implements AuthCredentialServiceMethods
{
  async getAuthCredential({ type }: GetAuthCredentialDto) {
    return await this.repository.findOne({ filter: { type } });
  }
}
