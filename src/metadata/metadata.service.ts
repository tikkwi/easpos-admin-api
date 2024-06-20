import { AppService } from '@common/decorator/app_service.decorator';
import { MetadataService } from '@common/shared';
import { Inject, forwardRef } from '@nestjs/common';
import { MerchantService } from 'src/merchant/merchant.service';
import { UserService } from 'src/user/user.service';

@AppService()
export class AdminMetadataService extends MetadataService {
  constructor(
    @Inject(forwardRef(() => UserService)) protected userService,
    @Inject(forwardRef(() => MerchantService)) protected merchantService,
  ) {
    super();
  }
}
