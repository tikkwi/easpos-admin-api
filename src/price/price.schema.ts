import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Price } from '@common/schema/price.schema';
import { ValidateIf } from 'class-validator';
import { ESubscription } from '@common/utils/enum';
import { AppProp } from '@common/decorator/app_prop.decorator';
import { SchemaTypes } from 'mongoose';
import { Subscription } from '@app/subscription/subscription.schema';

@Schema()
export class AppPrice extends Price {
   //NOTE: more user don't mean only specific number of user can create account.. It's more like num concurrent user.
   @ValidateIf((o) => ![ESubscription.Offline, ESubscription.Demo].includes(o.type))
   @AppProp({ type: Number })
   addedUserPrice: number;

   @AppProp({ type: SchemaTypes.ObjectId, ref: 'Subscription' })
   product: Subscription;
}

export const AppPriceSchema = SchemaFactory.createForClass(AppPrice);
