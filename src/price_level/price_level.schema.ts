import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { PriceLevel } from '@common/schema/price_level.schema';
import { EPrice } from '@common/utils/enum';
import { IsAppEnum } from '@common/validator/is_app_enum';
import { AppProp } from '@common/decorator/app_prop.decorator';
import { SchemaTypes } from 'mongoose';
import { AppPrice } from '@app/price/price.schema';
import { AppCurrency } from '@app/currency/currency.schema';
import { ValidateIf } from 'class-validator';
import { Category } from '@common/schema/category.schema';

const allowedLevels = [
   EPrice.SpendBase,
   EPrice.TotalSpendBase,
   EPrice.PaymentMethod,
   EPrice.Currency,
] as const;
type AllowedPrice = (typeof allowedLevels)[number];

@Schema()
export class AppPriceLevel extends PriceLevel {
   @AppProp({ type: String, enum: EPrice })
   @IsAppEnum(EPrice, {
      pick: allowedLevels as any,
   })
   type: Extract<EPrice, AllowedPrice>;

   @AppProp({ type: Boolean, default: false })
   addedUser: boolean;

   @ValidateIf((o) => o.perProduct)
   @AppProp({ type: [{ type: SchemaTypes.ObjectId, ref: 'AppPrice' }] })
   applicablePrices: AppPrice[];

   @ValidateIf((o) => o.type === EPrice.Currency)
   @AppProp({ type: SchemaTypes.ObjectId, ref: 'AppCurrency', required: false })
   currency?: AppCurrency;

   @ValidateIf((o) => o.type === EPrice.PaymentMethod)
   @AppProp({ type: SchemaTypes.ObjectId, ref: 'AppCategory', required: false })
   paymentMethod?: Category;
}

export const AppPriceLevelSchema = SchemaFactory.createForClass(AppPriceLevel);
