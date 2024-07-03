import { AdminAppServiceMethods, GetAuthDataDto } from '@common/dto/admin_app.dto';
import { Injectable } from '@nestjs/common';
import { AuthCredentialService } from 'src/auth_credential/auth_credential.service';
import { MerchantService } from 'src/merchant/merchant.service';

@Injectable()
export class AdminAppService implements AdminAppServiceMethods {
  constructor(
    private readonly authCredentialService: AuthCredentialService,
    private readonly merchantService: MerchantService,
  ) {}

  async getAuthData({ url, id }: GetAuthDataDto) {
    const { data: authCred } = await this.authCredentialService.getAuthCredential({ url });
    const { merchant, isSubActive } = await this.merchantService.merchantWithAuth({ id });

    return {
      isSubActive,
      basicAuth: { userName: authCred.userName, password: authCred.password },
      merchant,
    };
  }
}
