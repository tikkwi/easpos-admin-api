import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@global_schema/base.schema';
import { AppProp } from '@decorator/app_prop.decorator';
import { SchemaTypes } from 'mongoose';
import { Currency } from '@global_schema/currency.schema';

@Schema()
export class AppConfig extends BaseSchema {
   @AppProp({ type: SchemaTypes.ObjectId, ref: 'Currency' })
   baseCurrency: Currency;
}

export const AppConfigSchema = SchemaFactory.createForClass(AppConfig);
