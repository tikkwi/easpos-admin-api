import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Campaign } from '@common/schema/campaign.schema';

@Schema()
export class AppCampaign extends Campaign {}

export const AppCampaignSchema = SchemaFactory.createForClass(AppCampaign);
