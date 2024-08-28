import { Module } from '@nestjs/common';
import { AppCampaignModule } from '@app/campaign/campaign.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppAllowance, AppAllowanceSchema } from '@app/allowance/allowance.schema';
import { AppAllowanceController } from '@app/allowance/allowance.controller';

@Module({
   imports: [
      AppCampaignModule,
      MongooseModule.forFeature([{ name: AppAllowance.name, schema: AppAllowanceSchema }]),
   ],
   controllers: [AppAllowanceController],
   providers: [AppAllowanceController],
   exports: [AppAllowanceController],
})
export class AppAllowanceModule {}
