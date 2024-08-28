import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '@common/schema/category.schema';

@Schema()
export class AppCategory extends Category {}

export const CategorySchema = SchemaFactory.createForClass(AppCategory);
