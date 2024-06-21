import { CoreService } from '@common/core/core.service';
import { AppService } from '@common/decorator/app_service.decorator';
import { AppConfigServiceMethods } from '@common/dto/app_config.dto';

@AppService()
export class AppConfigService extends CoreService<AppConfig> implements AppConfigServiceMethods {
  async getConfig(_) {
    return await this.repository.findOne({ filter: {} });
  }
}
