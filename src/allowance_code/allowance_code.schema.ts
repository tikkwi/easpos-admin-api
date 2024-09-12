import { Schema, SchemaFactory } from '@nestjs/mongoose';
import AllowanceCode from '@shared/allowance_code/allowance_code.schema';
import AppProp from '@common/decorator/app_prop.decorator';
import { SchemaTypes } from 'mongoose';
import AppAllowance from '../allowance/allowance.schema';

@Schema()
export default class AppAllowanceCode extends AllowanceCode {
   @AppProp({ type: SchemaTypes.ObjectId, ref: 'AppAllowance' })
   allowance: AppAllowance;
}

export const AppAllowanceCodeSchema = SchemaFactory.createForClass(AppAllowanceCode);
