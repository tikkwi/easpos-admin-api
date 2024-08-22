import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { AdminService } from './admin.service';

@AppController('user', [EAllowedUser.Admin])
export class AdminController {
   constructor(private readonly service: AdminService) {}
}
