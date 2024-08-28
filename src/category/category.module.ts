import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category } from '@common/schema/category.schema';
import { CategorySchema } from '@app/category/category.schema';
import { AppCategoryController } from '@app/category/category.controller';
import { AppCategoryService } from '@app/category/category.service';

@Module({
   imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
   controllers: [AppCategoryController],
   providers: [AppCategoryService],
})
export class AppCategoryModule {}
