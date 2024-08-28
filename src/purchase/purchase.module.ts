import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppPurchase, AppPurchaseSchema } from '@app/purchase/purchase.schema';
import { AppPurchaseController } from '@app/purchase/purchase.controller';
import { AppPurchaseService } from '@app/purchase/purchase.service';

@Module({
   imports: [MongooseModule.forFeature([{ name: AppPurchase.name, schema: AppPurchaseSchema }])],
   controllers: [AppPurchaseController],
   providers: [AppPurchaseService],
   exports: [AppPurchaseService],
})
export class AppPurchaseModule {}
