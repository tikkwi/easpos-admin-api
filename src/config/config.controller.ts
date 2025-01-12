import AppController from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { AppConfigService } from './config.service';

@AppController('config', { admin: [EAllowedUser.Admin] })
export default class AppConfigController {
   constructor(protected readonly service: AppConfigService) {}
}
