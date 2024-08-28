import { AppService } from '@common/decorator/app_service.decorator';
import { AllowanceCodeService } from '@common/service/allowance_code/allowance_code.service';
import { ContextService } from '@common/core/context/context.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppAllowanceService } from '@app/allowance/allowance.service';
import { AppAllowanceCode } from '@app/allowance_code/allowance_code.schema';

@AppService()
export class AppAllowanceCodeService extends AllowanceCodeService {
   constructor(
      protected readonly context: ContextService,
      protected readonly allowanceService: AppAllowanceService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppAllowanceCode>,
   ) {
      super();
   }
}
