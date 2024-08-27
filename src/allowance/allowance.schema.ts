import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Allowance } from '@common/schema/allowance.schema';

@Schema()
export class AppAllowance extends Allowance {}

export const AppAllowanceSchema = SchemaFactory.createForClass(AppAllowance);
