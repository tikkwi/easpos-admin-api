import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppPriceLevel, AppPriceLevelSchema } from '@app/price_level/price_level.schema';
import { AppPriceLevelController } from '@app/price_level/price_level.controller';
import { AppPriceLevelService } from '@app/price_level/price_level.service';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: AppPriceLevel.name, schema: AppPriceLevelSchema }]),
   ],
   controllers: [AppPriceLevelController],
   providers: [AppPriceLevelService],
   exports: [AppPriceLevelService],
})
export class AppPriceLevelModule {}
