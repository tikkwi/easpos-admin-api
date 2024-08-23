import { AppController } from '@decorator/app_controller.decorator';
import { EAllowedUser } from '@utils/enum';
import { AdminService } from './admin.service';

@AppController('user', [EAllowedUser.Admin])
export class AdminController {
   constructor(private readonly service: AdminService) {}
}
