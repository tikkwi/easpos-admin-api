import { CoreController } from '@common/core/core.controller';
import { AppController } from '@common/decorator/app_controller.decorator';
import { AdminAppService } from './admin_app.service';

@AppController()
export class AdminAppController extends CoreController<AdminAppService> {}
