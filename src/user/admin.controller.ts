import { AdminService } from './admin.service';
import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { CoreController } from '@common/core/core.controller';

@AppController('user', [EAllowedUser.Admin])
export class AdminController extends CoreController {
   constructor(protected readonly service: AdminService) {
      super();
   }
}
