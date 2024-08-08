import { REPOSITORY } from '@common/constant';
import { ContextService } from '@common/core/context/context.service';
import { CoreService } from '@common/core/core.service';
import { Repository } from '@common/core/repository';
import { AppService } from '@common/decorator/app_service.decorator';
import {
   AuthCredentialServiceMethods,
   GetAuthCredentialDto,
} from '@common/dto/auth_credential.dto';
import { AuthCredential } from '@common/schema/auth_credential.schema';
import { parseGrpcPath } from '@common/utils/regex';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@AppService()
export class AuthCredentialService extends CoreService implements AuthCredentialServiceMethods {
   constructor(
      @Inject(REPOSITORY) private readonly repository: Repository<AuthCredential>,
      protected readonly context: ContextService,
   ) {
      super();
   }

   async getAuthCredential({ url, ip }: GetAuthCredentialDto) {
      const [pkg, srv, pth] = parseGrpcPath(url);
      const isRpc = pkg.includes('_PACKAGE');

      if (isRpc && !ip) throw new BadRequestException();

      const filter = isRpc
         ? {
              allowedPeers: { $elemMatch: { $eq: ip } },
              authServices: {
                 $elemMatch: { service: srv, $or: [{ paths: undefined }, { paths: pth }] },
              },
           }
         : { authPaths: { $elemMatch: { $eq: url } } };
      const { data } = await this.repository.findOne({ filter });
      return { data };
   }
}
