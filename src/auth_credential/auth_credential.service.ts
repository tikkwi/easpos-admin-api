import { CoreService } from '@common/core';
import { AppService } from '@common/decorator';
import { AuthCredentialServiceMethods, GetAuthCredentialDto } from '@common/dto';
import { AuthCredential } from '@common/schema';

@AppService()
export class AuthCredentialService
  extends CoreService<AuthCredential>
  implements AuthCredentialServiceMethods
{
  async getAuthCredential({ type }: GetAuthCredentialDto) {
    return await this.repository.findOne({ filter: { type } });
  }
}
