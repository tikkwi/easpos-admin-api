import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@common/schema/base.schema';

@Schema()
export class AppConfig extends BaseSchema {}

export const AppConfigSchema = SchemaFactory.createForClass(AppConfig);
