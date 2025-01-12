import { BadRequestException } from '@nestjs/common';
import {
   AuthCredentialServiceMethods,
   GetAuthCredentialDto,
} from '@common/dto/auth_credential.dto';
import { parseGrpcPath } from '@common/utils/regex';
import AppService from '@common/decorator/app_service.decorator';
import BaseService from '@common/core/base/base.service';

@AppService()
export default class AuthCredentialService
   extends BaseService<AuthCredential>
   implements AuthCredentialServiceMethods
{
   async getAuthCredential({ ctx, url, ip }: GetAuthCredentialDto) {
      const repository = await this.getRepository(ctx.connection, ctx.session);
      const [_, srv, pth] = parseGrpcPath(url);
      const isRpc = url.includes('_PACKAGE');

      if (isRpc && !ip) throw new BadRequestException();

      const filter = isRpc
         ? {
              allowedPeers: { $elemMatch: { $eq: ip } },
              authServices: {
                 $elemMatch: { service: srv, $or: [{ paths: undefined }, { paths: pth }] },
              },
           }
         : { authPaths: { $elemMatch: { $eq: url } } };
      const { data } = await repository.findOne({ filter });
      return { data };
   }
}
