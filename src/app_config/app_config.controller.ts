import { AppController } from '@app/decorator';
import { AppConfigService } from './app_config.service';
import { EAllowedUser } from '@app/helper';

@AppController('admin-api/app-config', [EAllowedUser.Admin])
export class AppConfigController {
  constructor(private readonly service: AppConfigService) {}
}
