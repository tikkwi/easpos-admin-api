import { AppService } from '@common/decorator/app_service.decorator';
import { AuditService } from '@common/service/audit.service';
import { ContextService } from '@common/core/context/context.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppAudit } from '@app/audit/audit.schema';

@AppService()
export class AppAuditService extends AuditService {
   constructor(
      protected readonly context: ContextService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppAudit>,
   ) {
      super();
   }
}
