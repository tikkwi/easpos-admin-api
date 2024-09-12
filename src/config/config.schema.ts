import { Schema, SchemaFactory } from '@nestjs/mongoose';
import AppProp from '@common/decorator/app_prop.decorator';
import BaseSchema from '@common/core/base.schema';

@Schema()
export default class AppConfig extends BaseSchema {
   @AppProp({ type: Number, default: 0 })
   pre_sub_end_mail: number;
}

export const AppConfigSchema = SchemaFactory.createForClass(AppConfig);
