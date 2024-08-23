import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@global_schema/user.schema';
import { AppProp } from '@decorator/app_prop.decorator';
import { SchemaTypes } from 'mongoose';
import { Type } from 'class-transformer';
import { UserRole } from '@global_dto/entity.dto';

@Schema()
export class Admin extends User {
   @AppProp({ type: SchemaTypes.Mixed })
   @Type(() => UserRole)
   role: UserRole;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
