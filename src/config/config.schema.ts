import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AppProp } from '@common/decorator/app_prop.decorator';
import { Config } from '@common/schema/config.schema';

@Schema()
export class AppConfig extends Config {
   @AppProp({ type: Number, default: 0 })
   pre_sub_end_mail: number;
}

export const AppConfigSchema = SchemaFactory.createForClass(AppConfig);
