import { Schema, SchemaFactory } from '@nestjs/mongoose';
import BaseSchema from '@common/core/base/base.schema';

@Schema()
export default class AppConfig extends BaseSchema {}

export const AppConfigSchema = SchemaFactory.createForClass(AppConfig);
