import { CoreController } from '@common/core/core.controller';
import { Get } from '@nestjs/common';
import { AdminAppService } from './admin_app.service';
import { AppController } from '@common/decorator/app_controller.decorator';

@AppController()
export class AdminAppController extends CoreController<AdminAppService> {
  @Get()
  getHello(): string {
    return 'hello';
  }
}
