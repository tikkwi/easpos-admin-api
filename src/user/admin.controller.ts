import AppController from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import CoreController from '@common/core/core.controller';
import AdminService from './admin.service';

@AppController('user', { admin: [EAllowedUser.Admin] })
export default class AdminController extends CoreController {
   constructor(protected readonly service: AdminService) {
      super();
   }
}
