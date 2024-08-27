import { AppService } from '@common/decorator/app_service.decorator';
import { AddressService } from '@common/service/address/address.service';
import { ContextService } from '@common/core/context/context.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppAddress } from '@app/address/address.schema';

@AppService()
export class AppAddressService extends AddressService {
   constructor(
      protected readonly context: ContextService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppAddress>,
   ) {
      super();
   }
}
