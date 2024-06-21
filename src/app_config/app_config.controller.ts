import { AppController } from '@common/decorator/app_controller.decorator';
import { AppConfigService } from './app_config.service';
import { CoreController } from '@common/core/core.controller';
import { EAllowedUser } from '@common/utils/enum';

@AppController('app-config', [EAllowedUser.Admin])
export class AppConfigController extends CoreController<AppConfigService> {}
