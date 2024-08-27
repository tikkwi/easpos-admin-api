import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Currency } from '@common/schema/currency.schema';

@Schema()
export class AppCurrency extends Currency {}

export const AppCurrencySchema = SchemaFactory.createForClass(AppCurrency);
