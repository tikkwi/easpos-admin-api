import { AppController } from '@decorator/app_controller.decorator';
import { AppConfigService } from './app_config.service';
import { EAllowedUser } from '@utils/enum';

@AppController('app-config', [EAllowedUser.Admin])
export class AppConfigController {
   constructor(private readonly service: AppConfigService) {}
}
