import { AppController } from '@common/decorator/app_controller.decorator';
import { AdminAppService } from './admin_app.service';

@AppController()
export class AdminAppController {
  constructor(private readonly service: AdminAppService) {}
}
