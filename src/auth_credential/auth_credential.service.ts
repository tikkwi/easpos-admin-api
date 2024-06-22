import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import {
  AuthCredentialServiceMethods,
  GetAuthCredentialDto,
} from '@common/dto/auth_credential.dto';
import { AuthCredential } from '@common/schema/auth_credential.schema';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthCredentialService implements AuthCredentialServiceMethods {
  constructor(@Inject(REPOSITORY) private readonly repository: Repository<AuthCredential>) {}

  async getAuthCredential({ type }: GetAuthCredentialDto) {
    return await this.repository.findOne({ filter: { type } });
  }
}
