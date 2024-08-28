import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { CampaignController } from '@common/service/campaign/campaign.controller';
import { CampaignService } from '@common/service/campaign/campaign.service';

@AppController('campaign', [EAllowedUser.Admin])
export class AppCampaignController extends CampaignController {
   constructor(protected readonly service: CampaignService) {
      super();
   }
}
