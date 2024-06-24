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
    private readonly appCredentialService: AuthCredentialService,
  ) {}

  async getAuthData({ url, id }: GetAuthDataDto) {
    let user: AuthUser,
      merchant: Merchant,
      basicAuth: any,
      isSubActive = false;

    const { data: config } = await this.configService.getConfig();

    const service: any = parsePath(url)[2];
    if (Object.values(EAuthCredential).includes(service)) {
      const { data } = await this.appCredentialService.getAuthCredential({
        type: service,
      });
      if (!data) throw new InternalServerErrorException();
      basicAuth = { userName: data.userName, password: data.password };
    }

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
