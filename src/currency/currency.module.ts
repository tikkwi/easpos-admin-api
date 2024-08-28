import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppCurrency, AppCurrencySchema } from '@app/currency/currency.schema';
import { AppCurrencyController } from '@app/currency/currency.controller';
import { AppCurrencyService } from '@app/currency/currency.service';

@Module({
   imports: [MongooseModule.forFeature([{ name: AppCurrency.name, schema: AppCurrencySchema }])],
   controllers: [AppCurrencyController],
   providers: [AppCurrencyService],
})
export class AppCurrencyModule {}
