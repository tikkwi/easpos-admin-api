import { AppController } from '@common/decorator/app_controller.decorator';
import { AppConfigService } from './app_config.service';
import { EAllowedUser } from '@common/utils/enum';

@AppController('app-config', [EAllowedUser.Admin])
export class AppConfigController {
   constructor(private readonly service: AppConfigService) {}
}
