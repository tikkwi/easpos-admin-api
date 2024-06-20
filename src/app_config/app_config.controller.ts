import { EAllowedUser } from '@common/utils';
import { AppConfigService } from './app_config.service';
import { AppController } from '@common/decorator';
import { CoreController } from '@common/core/core.controller';

@AppController('app-config', [EAllowedUser.Admin])
export class AppConfigController extends CoreController {
  constructor(service: AppConfigService) {
    super(service);
  }
}
