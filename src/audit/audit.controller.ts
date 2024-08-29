import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { AuditController } from '@common/service/audit/audit.controller';
import { AppAuditService } from '@app/audit/audit.service';

@AppController('audit', [EAllowedUser.Admin])
export class AppAuditController extends AuditController {
   constructor(protected readonly service: AppAuditService) {
      super();
   }
}
