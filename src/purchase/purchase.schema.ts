import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ValidateIf } from 'class-validator';
import { AppProp } from '@common/decorator/app_prop.decorator';
import { ESubscription } from '@common/utils/enum';
import { SchemaTypes } from 'mongoose';
import { MerchantSubscription } from '@app/subscription/subscription.schema';
import { Purchase } from '@common/schema/purchase.schema';
import { Merchant } from '@app/merchant/merchant.schema';

@Schema()
export class AppPurchase extends Purchase {
   @AppProp({ type: SchemaTypes.ObjectId, ref: 'MerchantSubscription' })
   type: MerchantSubscription;

   @ValidateIf((o) => ![ESubscription.Offline, ESubscription.Demo].includes(o.type))
   @AppProp({ type: Number })
   numUser: number;

   @AppProp({ type: SchemaTypes.ObjectId, ref: 'Merchant' })
   merchant: Merchant;
}

export const AppPurchaseSchema = SchemaFactory.createForClass(AppPurchase);
