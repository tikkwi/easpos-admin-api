import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address } from '@common/schema/address.schema';

@Schema()
export class AppAddress extends Address {}

export const AppAddressSchema = SchemaFactory.createForClass(AppAddress);
