import { AppService } from '@common/decorator/app_service.decorator';
import { AllowanceService } from '@common/service/allowance/allowance.service';
import { ContextService } from '@common/core/context/context.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppAllowance } from '@app/allowance/allowance.schema';
import { AppCampaignService } from '@app/campaign/campaign.service';

@AppService()
export class AppAllowanceService extends AllowanceService {
   constructor(
      protected readonly context: ContextService,
      protected readonly campaignService: AppCampaignService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppAllowance>,
   ) {
      super();
   }
}
