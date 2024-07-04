import { ContextService } from '@common/core/context/context.service';
import { CoreService } from '@common/core/core.service';
import { AppService } from '@common/decorator/app_service.decorator';
import { AdminAppServiceMethods, GetAuthDataDto } from '@common/dto/admin_app.dto';
import { AuthCredentialService } from 'src/auth_credential/auth_credential.service';
import { MerchantService } from 'src/merchant/merchant.service';

@AppService()
export class AdminAppService extends CoreService implements AdminAppServiceMethods {
  constructor(
    private readonly authCredentialService: AuthCredentialService,
    private readonly merchantService: MerchantService,
    protected readonly context: ContextService,
  ) {
    super();
  }

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
