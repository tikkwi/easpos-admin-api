import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { EAllowance } from '@common/utils/enum';
import { IsBoolean, IsNumber } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { Type } from 'class-transformer';
import AppProp from '@common/decorator/app_prop.decorator';
import Allowance from '@shared/allowance/allowance.schema';
import IsAppEnum from '@common/validator/is_app_enum';

class AllowanceBenefit {
   @IsBoolean()
   percentage: boolean;

   @IsNumber()
   amount: number;
}

const allowedLevels = [
   EAllowance.SpendBase,
   EAllowance.TotalSpendBase,
   EAllowance.PaymentMethod,
   EAllowance.Currency,
] as const;

type AllowedPrice = (typeof allowedLevels)[number];

@Schema()
export default class AppAllowance extends Allowance {
   @AppProp({ type: String, enum: EAllowance })
   @IsAppEnum(EAllowance, {
      pick: allowedLevels as any,
   })
   type: Extract<EAllowance, AllowedPrice>;

   @AppProp({ type: Boolean, default: false })
   addedUser: boolean;

   @AppProp({ type: SchemaTypes.Mixed })
   @Type(() => AllowanceBenefit)
   benefit: AllowanceBenefit;
}

export const AppAllowanceSchema = SchemaFactory.createForClass(AppAllowance);
