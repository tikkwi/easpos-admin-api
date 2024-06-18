import { Module } from '@nestjs/common';
import { AuthCredentialService } from './auth_credential.service';
//import { getRepositoryProviders } from '@app/helper';
import { AuthCredential, AuthCredentialSchema } from '@app/schema';

@Module({
  providers: [
    AuthCredentialService,
    // ...getRepositoryProviders([{ name: AuthCredential.name, schema: AuthCredentialSchema }]),
  ],
})
export class AuthCredentialModule {}
