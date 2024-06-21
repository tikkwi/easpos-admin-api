import { AppService } from '@common/decorator/app_service.decorator';
import { MerchantSharedServiceMethods } from '@common/dto/merchant.dto';
import { UserSharedServiceMethods } from '@common/dto/user.dto';
import { MetadataService } from '@common/shared/metadata/metadata.service';

@AppService()
export class AdminMetadataService extends MetadataService {
  protected userService: UserSharedServiceMethods;
  protected merchantService: MerchantSharedServiceMethods;
}
