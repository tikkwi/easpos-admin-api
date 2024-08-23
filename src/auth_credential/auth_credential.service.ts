import { REPOSITORY } from '@constant/model.constant';
import { ContextService } from '@core/context/context.service';
import { CoreService } from '@core/service/core.service';
import { Repository } from '@core/repository';
import { AppService } from '@decorator/app_service.decorator';
import { GetAuthCredentialDto } from '@service_dto/auth_credential.dto';
import { AuthCredential } from '@service_schema/auth_credential.schema';
import { BadRequestException, Inject } from '@nestjs/common';
import { parseGrpcPath } from '@utils/regex';

@AppService()
export class AuthCredentialService extends CoreService {
   constructor(
      protected readonly context: ContextService,
      @Inject(REPOSITORY) private readonly repository: Repository<AuthCredential>,
   ) {
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
