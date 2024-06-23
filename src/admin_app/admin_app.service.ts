import { AdminAppServiceMethods } from '@common/dto/admin_app.dto';
import { BaseDto } from '@common/dto/core.dto';
import { decrypt } from '@common/utils/encrypt';
import { EAuthCredential, EUser } from '@common/utils/enum';
import { parsePath } from '@common/utils/regex';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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

  async getAuthData({ request }: BaseDto) {
    let user: AuthUser,
      merchant: Merchant,
      basicAuth: any,
      isSubActive = false;
    const { data: config } = await this.configService.getConfig();
    const service: any = parsePath(request.originalUrl)[2];
    if (Object.values(EAuthCredential).includes(service)) {
      const { data } = await this.appCredentialService.getAuthCredential({
        type: service,
      });
      if (!data) throw new InternalServerErrorException();
      basicAuth = { userName: data.userName, password: data.password };
    }
    // if (!config) throw new ForbiddenException('Config not found');
    if (request.session.user) {
      const { id } = await decrypt(request.session.user);
      if (!id) throw new BadRequestException("Don't found user");
      ({ data: user } = await this.userService.userWithAuth({ id, request }));
      if (!request.user) throw new BadRequestException('User not found');
      if (user.type === EUser.Merchant) {
        ({ data: merchant, isSubActive } = await this.merchantService.merchantWithAuth({
          request,
          id: request.user.merchant,
        }));
        if (!merchant) throw new BadRequestException('Merchant not found');
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
