import { ContextService } from '@common/core/context/context.service';
import { AppService } from '@common/decorator/app_service.decorator';
import { MerchantServiceMethods } from '@common/dto/merchant.dto';
import { UserServiceMethods } from '@common/dto/user.dto';
import { MetadataService } from '@common/shared/metadata/metadata.service';
import { forwardRef, Inject } from '@nestjs/common';
import { AddressService } from '@shared/address/address.service';
import { MerchantService } from 'src/merchant/merchant.service';
import { UserService } from 'src/user/user.service';

@AppService()
export class AdminMetadataService extends MetadataService {
   constructor(
      protected addressService: AddressService,
      @Inject(forwardRef(() => MerchantService))
      protected readonly merchantService: MerchantServiceMethods,
      @Inject(forwardRef(() => UserService))
      protected readonly userService: UserServiceMethods,
      protected readonly context: ContextService,
   ) {
      super();
   }
}
