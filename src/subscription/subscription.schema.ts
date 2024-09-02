import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AppProp } from '@common/decorator/app_prop.decorator';
import { ESubscription } from '@common/utils/enum';
import { Product } from '@common/schema/product.schema';

@Schema()
export class AppSubscription extends Product {
   @AppProp({ type: String, enum: ESubscription })
   subType: ESubscription;
}

export const AppSubscriptionSchema = SchemaFactory.createForClass(AppSubscription);
