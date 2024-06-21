import { ContextService } from '@common/core/context/context.service';
import { TransactionService } from '@common/core/transaction/transaction.service';
import { AppService } from '@common/decorator/app_service.decorator';
import { AdminAppServiceMethods } from '@common/dto/admin_app.dto';
import { AppConfigServiceMethods } from '@common/dto/app_config.dto';
import { AuthCredentialServiceMethods } from '@common/dto/auth_credential.dto';
import { BaseDto } from '@common/dto/core.dto';
import { MerchantServiceMethods } from '@common/dto/merchant.dto';
import { UserServiceMethods } from '@common/dto/user.dto';
import { decrypt } from '@common/utils/encrypt';
import { EAuthCredential, EUser } from '@common/utils/enum';
import { parsePath } from '@common/utils/regex';
import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';

@AppService()
export class AdminAppService implements AdminAppServiceMethods {
  protected readonly transaction: TransactionService;
  protected readonly context: ContextService;
  private readonly configService: AppConfigServiceMethods;
  private readonly userService: UserServiceMethods;
  private readonly merchantService: MerchantServiceMethods;
  private readonly appCredentialService: AuthCredentialServiceMethods;

  async getAuthData({ request }: BaseDto) {
    let user: AuthUser,
      merchant: Merchant,
      basicAuth: any,
      isSubActive = false;
    const { data: config } = await this.configService.getConfig({ request });
    const service: any = parsePath(request.path)[2];
    if (Object.values(EAuthCredential).includes(service)) {
      const { data } = await this.appCredentialService.getAuthCredential({
        request,
        type: service,
      });
      if (!data) throw new InternalServerErrorException();
      basicAuth = { userName: data.userName, password: data.password };
    }
    if (!config) throw new ForbiddenException('Config not found');
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
