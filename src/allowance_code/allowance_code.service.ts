import { AppService } from '@common/decorator/app_service.decorator';
import { AllowanceCodeService } from '@common/service/allowance_code.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppAllowanceService } from '@app/allowance/allowance.service';
import { AppAllowanceCode } from '@app/allowance_code/allowance_code.schema';

@AppService()
export class AppAllowanceCodeService extends AllowanceCodeService {
   constructor(
      protected readonly allowanceService: AppAllowanceService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppAllowanceCode>,
   ) {
      super();
   }
}
