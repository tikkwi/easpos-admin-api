import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ValidateIf } from 'class-validator';
import { AppProp } from '@common/decorator/app_prop.decorator';
import { ESubscription } from '@common/utils/enum';
import { BaseSchema } from '@common/schema/base.schema';

@Schema()
export class AppSubscription extends BaseSchema {
   @AppProp({ type: String, enum: ESubscription })
   type: ESubscription;

   @AppProp({ type: String, required: false })
   description?: string;

   @AppProp({ type: Number })
   basePrice: number;

   //NOTE: more user don't mean only specific number of user can create account.. It's more like num concurrent user.
   @ValidateIf((o) => ![ESubscription.Offline, ESubscription.Demo].includes(o.type))
   @AppProp({ type: Number })
   addedUserPrice: number;
}

export const AppSubscriptionSchema = SchemaFactory.createForClass(AppSubscription);
