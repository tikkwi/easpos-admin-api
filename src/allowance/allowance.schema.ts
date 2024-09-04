import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Allowance, AllowanceBenefit } from '@common/schema/allowance.schema';
import { EAllowance } from '@common/utils/enum';
import { AppProp } from '@common/decorator/app_prop.decorator';
import { IsAppEnum } from '@common/validator/is_app_enum';
import { ValidateIf } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { AppPrice } from '@app/price/price.schema';
import { AppCurrency } from '@app/currency/currency.schema';
import { Type } from 'class-transformer';
import { AppCategory } from '@app/category/category.schema';

const allowedLevels = [
   EAllowance.SpendBase,
   EAllowance.TotalSpendBase,
   EAllowance.PaymentMethod,
   EAllowance.Currency,
] as const;
type AllowedPrice = (typeof allowedLevels)[number];

@Schema()
export class AppAllowance extends Allowance {
   @AppProp({ type: String, enum: EAllowance })
   @IsAppEnum(EAllowance, {
      pick: allowedLevels as any,
   })
   type: Extract<EAllowance, AllowedPrice>;

   @AppProp({ type: Boolean, default: false })
   addedUser: boolean;

   @ValidateIf((o) => o.type === EAllowance.Currency)
   @AppProp({ type: [{ type: SchemaTypes.ObjectId, ref: 'AppCurrency' }], required: false })
   currencyTrigger?: AppCurrency[];

   @ValidateIf((o) => o.type === EAllowance.PaymentMethod)
   @AppProp({ type: [{ type: SchemaTypes.ObjectId, ref: 'AppCategory' }], required: false })
   paymentMethodTrigger?: AppCategory[];

   @AppProp({ type: SchemaTypes.Mixed })
   @Type(() => AllowanceBenefit)
   benefit: AllowanceBenefit;

   @ValidateIf((o) => o.perProduct)
   @AppProp({ type: [{ type: SchemaTypes.ObjectId, ref: 'AppPrice' }] })
   applicablePrices: AppPrice[];
}

export const AppAllowanceSchema = SchemaFactory.createForClass(AppAllowance);
