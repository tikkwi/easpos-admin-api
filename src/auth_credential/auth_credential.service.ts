import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import {
  AuthCredentialServiceMethods,
  GetAuthCredentialDto,
} from '@common/dto/auth_credential.dto';
import { AuthCredential } from '@common/schema/auth_credential.schema';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AuthCredentialService implements AuthCredentialServiceMethods {
  constructor(@Inject(REPOSITORY) private readonly repository: Repository<AuthCredential>) {}

  async getAuthCredential({ url }: GetAuthCredentialDto) {
    const { data } = await this.repository.find({ filter: { authPaths: { $elemMatch: url } } });
    if (data.length > 1) throw new InternalServerErrorException();
    return { data: data[0] };
  }
}
