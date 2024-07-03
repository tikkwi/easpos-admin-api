import { MerchantSharedServiceMethods } from '@common/dto/merchant.dto';
import { UserSharedServiceMethods } from '@common/dto/user.dto';
import { MetadataService } from '@common/shared/metadata/metadata.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AddressService } from '@shared/address/address.service';
import { MerchantService } from 'src/merchant/merchant.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminMetadataService extends MetadataService {
  constructor(
    protected addressService: AddressService,
    @Inject(forwardRef(() => MerchantService))
    protected readonly merchantService: MerchantSharedServiceMethods,
    @Inject(forwardRef(() => UserService)) protected readonly userService: UserSharedServiceMethods,
  ) {
    super();
  }
}
