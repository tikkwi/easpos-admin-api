import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from '@common/schema/base.schema';
import { AppProp } from '@common/decorator/app_prop.decorator';
import { Currency } from '@common/schema/currency.schema';

@Schema()
export class AppConfig extends BaseSchema {
   @AppProp({ type: SchemaTypes.ObjectId, ref: 'Currency' })
   baseCurrency: Currency;
}

export const AppConfigSchema = SchemaFactory.createForClass(AppConfig);
