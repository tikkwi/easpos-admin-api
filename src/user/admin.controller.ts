import AppController from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import AdminService from './admin.service';

@AppController('user', { admin: [EAllowedUser.Admin] })
export default class AdminController {
   constructor(protected readonly service: AdminService) {}
}
