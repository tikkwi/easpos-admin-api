import { MetadataService } from '@common/shared/metadata/metadata.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AddressServiceMethods } from '@shared/address/address.dto';
import { AddressService } from '@shared/address/address.service';
import { MerchantService } from 'src/merchant/merchant.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminMetadataService extends MetadataService {
  constructor(
    protected addressService: AddressService,
    @Inject(forwardRef(() => MerchantService)) protected readonly merchantService: MerchantService,
    @Inject(forwardRef(() => UserService)) protected readonly userService: UserService,
  ) {
    super();
  }
}
