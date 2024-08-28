import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Mail } from '@common/schema/mail.schema';

@Schema()
export class AppMail extends Mail {}

export const AppMailSchema = SchemaFactory.createForClass(AppMail);
