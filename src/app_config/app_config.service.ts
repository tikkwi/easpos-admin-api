import { CoreService } from '@common/core';
import { AppService } from '@common/decorator';
import { AppConfigServiceMethods } from '@common/dto';
import { AppConfig, AppConfigSchema } from '@common/schema';

@AppService()
export class AppConfigService extends CoreService<AppConfig> implements AppConfigServiceMethods {
  constructor() {
    super(AppConfig.name, AppConfigSchema);
  }

  async getConfig(_) {
    return await this.repository.findOne({ filter: {} });
  }
}
