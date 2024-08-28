import { AppService } from '@common/decorator/app_service.decorator';
import { CampaignService } from '@common/service/campaign/campaign.service';
import { ContextService } from '@common/core/context/context.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppCampaign } from '@app/campaign/campaign.schema';

@AppService()
export class AppCampaignService extends CampaignService {
   constructor(
      protected readonly context: ContextService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppCampaign>,
   ) {
      super();
   }
}
