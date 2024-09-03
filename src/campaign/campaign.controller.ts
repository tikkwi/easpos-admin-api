import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { CampaignService } from '@common/service/campaign.service';
import { CoreController } from '@common/core/core.controller';
import { Body, Post } from '@nestjs/common';
import { CreateCampaignDto } from '@common/dto/service/campaign.dto';

@AppController('campaign', [EAllowedUser.Admin])
export class AppCampaignController extends CoreController {
   constructor(protected readonly service: CampaignService) {
      super();
   }

   @Post('create')
   createAllowance(@Body() dto: CreateCampaignDto) {
      return this.service.createCampaign(dto);
   }
}
