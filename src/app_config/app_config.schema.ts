import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from '@common/schema/global/base.schema';
import { AppProp } from '@common/decorator/app_prop.decorator';
import { Currency } from '@common/schema/global/currency.schema';

@Schema()
export class AppConfig extends BaseSchema {
   @AppProp({ type: SchemaTypes.ObjectId, ref: 'Currency' })
   baseCurrency: Currency;
}

export const AppConfigSchema = SchemaFactory.createForClass(AppConfig);
