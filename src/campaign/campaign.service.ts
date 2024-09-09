import { AppService } from '@common/decorator/app_service.decorator';
import { CampaignService } from '@common/service/campaign.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppCampaign } from '@app/campaign/campaign.schema';
import { AppCategoryService } from '@app/category/category.service';

@AppService()
export class AppCampaignService extends CampaignService {
   constructor(
      protected readonly categoryService: AppCategoryService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppCampaign>,
   ) {
      super();
   }
}
