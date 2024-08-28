import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ValidateIf } from 'class-validator';
import { AppProp } from '@common/decorator/app_prop.decorator';
import { SchemaTypes } from 'mongoose';
import { Purchase } from '@common/schema/purchase.schema';
import { Merchant } from '@common/schema/merchant.schema';
import { AppSubscription } from '@app/subscription/subscription.schema';

@Schema()
export class AppPurchase extends Purchase {
   @AppProp({ type: SchemaTypes.ObjectId, ref: 'AppSubscription' })
   type: AppSubscription;

   @ValidateIf((o) => o.subscription)
   @AppProp({ type: Number })
   numUser: number;

   @AppProp({ type: SchemaTypes.ObjectId, ref: 'Merchant' })
   merchant: Merchant;

   @AppProp({ type: Boolean, default: false })
   sentExpiredMail: boolean;

   @AppProp({ type: Boolean, default: false })
   sentPreExpireMail: boolean;
}

export const AppPurchaseSchema = SchemaFactory.createForClass(AppPurchase);
