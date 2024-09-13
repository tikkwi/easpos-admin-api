import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { UserRole } from '@common/dto/entity.dto';
import User from '@shared/user/user.schema';
import AppProp from '@common/decorator/app_prop.decorator';

@Schema()
export default class Admin extends User {
   @AppProp({ type: SchemaTypes.Mixed }, { type: UserRole })
   role: UserRole;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
