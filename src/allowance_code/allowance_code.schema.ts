import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AllowanceCode } from '@common/schema/allowance_code.schema';

@Schema()
export class AppAllowanceCode extends AllowanceCode {}

export const AppAllowanceCodeSchema = SchemaFactory.createForClass(AppAllowanceCode);
