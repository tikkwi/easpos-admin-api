import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { PriceLevel } from '@common/schema/price_level.schema';
import { EPrice } from '@common/utils/enum';
import { IsAppEnum } from '@common/validator/is_app_enum';
import { AppProp } from '@common/decorator/app_prop.decorator';
import { SchemaTypes } from 'mongoose';
import { AppSubscription } from '@app/subscription/subscription.schema';

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

   @AppProp({ type: SchemaTypes.ObjectId, ref: 'AppSubscription' })
   subscription: AppSubscription;
}

export const AppPriceLevelSchema = SchemaFactory.createForClass(AppPriceLevel);
