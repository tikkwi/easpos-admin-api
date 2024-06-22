import { AppService } from '@common/decorator/app_service.decorator';
import { MetadataService } from '@common/shared/metadata/metadata.service';

@AppService()
export class AdminMetadataService extends MetadataService {
  protected readonly merchantService;
  protected readonly userService;
}
