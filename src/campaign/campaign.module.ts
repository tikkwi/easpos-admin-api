import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppCampaign, AppCampaignSchema } from '@app/campaign/campaign.schema';
import { AppCampaignController } from '@app/campaign/campaign.controller';
import { AppCampaignService } from '@app/campaign/campaign.service';

@Module({
   imports: [MongooseModule.forFeature([{ name: AppCampaign.name, schema: AppCampaignSchema }])],
   controllers: [AppCampaignController],
   providers: [AppCampaignService],
   exports: [AppCampaignService],
})
export class AppCampaignModule {}
