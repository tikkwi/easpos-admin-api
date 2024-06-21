import { AppService } from '@common/decorator/app_service.decorator';
import { MerchantServiceMethods } from '@common/dto/merchant.dto';
import { MetadataServiceMethods } from '@common/dto/metadata.dto';
import { UserService } from '@common/shared/user/user.service';

@AppService()
export class AdminUserService extends UserService {
  protected merchantService: MerchantServiceMethods;
  protected metadataService: MetadataServiceMethods;
}
