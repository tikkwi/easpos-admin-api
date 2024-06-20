import { CoreController } from '@common/core/core.controller';
import { AppController } from '@common/decorator';
import { Get } from '@nestjs/common';
import { AppService } from './admin_app.service';

@AppController()
export class AdminAppController extends CoreController {
  constructor(service: AppService) {
    super(service);
  }

  @Get()
  getHello(): string {
    return 'hello';
  }
}
