import { AppConfigService } from './app_config.service';
import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';

@AppController('app-config', [EAllowedUser.Admin])
export class AppConfigController {
   constructor(private readonly service: AppConfigService) {}
}
