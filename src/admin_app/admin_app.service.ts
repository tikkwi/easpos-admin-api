import { AdminAppServiceMethods, GetAuthDataDto } from '@common/dto/admin_app.dto';
import { AuthUser } from '@common/dto/core.dto';
import { EAuthCredential, EUser } from '@common/utils/enum';
import { parsePath } from '@common/utils/regex';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AppConfigService } from 'src/app_config/app_config.service';
import { AuthCredentialService } from 'src/auth_credential/auth_credential.service';
import { MerchantService } from 'src/merchant/merchant.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminAppService implements AdminAppServiceMethods {
  constructor(
    private readonly configService: AppConfigService,
    private readonly userService: UserService,
    private readonly merchantService: MerchantService,
    private readonly authCredentialService: AuthCredentialService,
  ) {}

  async getAuthData({ url, id }: GetAuthDataDto) {
    let user: AuthUser,
      merchant: Merchant,
      basicAuth: any,
      isSubActive = false;

    const { data: config } = await this.configService.getConfig();

    const { data: authCred } = await this.authCredentialService.getAuthCredential({ url });
    if (authCred) basicAuth = { userName: authCred.userName, password: authCred.password };

    if (id) {
      ({ data: user } = await this.userService.userWithAuth({ id, url }));
      if (!user) throw new BadRequestException('User not found');
      if (user.type === EUser.Merchant) {
        ({ data: merchant, isSubActive } = await this.merchantService.merchantWithAuth({
          id: user.merchant,
        }));
      }
    }
    return {
      config,
      user,
      merchant,
      isSubActive,
      basicAuth,
    };
  }
}
