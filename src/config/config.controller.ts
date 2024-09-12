import AppController from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import CoreController from '@common/core/core.controller';
import { AppConfigService } from './config.service';

@AppController('config', { admin: [EAllowedUser.Admin] })
export default class AppConfigController extends CoreController {
   constructor(protected readonly service: AppConfigService) {
      super();
   }
}
