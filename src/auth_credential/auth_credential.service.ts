import { BadRequestException, Inject } from '@nestjs/common';
import { AppService } from '@common/decorator/app_service.decorator';
import { CoreService } from '@common/core/core.service';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { GetAuthCredentialDto } from '@common/dto/shared/auth_credential.dto';
import { parseGrpcPath } from '@common/utils/regex';
import { AuthCredential } from '@common/schema/auth_credential.schema';

@AppService()
export class AuthCredentialService extends CoreService<AuthCredential> {
   constructor(@Inject(REPOSITORY) protected readonly repository: Repository<AuthCredential>) {
      super();
   }

   async getAuthCredential({ url, ip }: GetAuthCredentialDto) {
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
      const { data } = await this.repository.findOne({ filter });
      return { data };
   }
}
