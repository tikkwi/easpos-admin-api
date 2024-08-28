import { CategoryService } from '@common/service/category/category.service';
import { ContextService } from '@common/core/context/context.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { Category } from '@common/schema/category.schema';

export class AppCategoryService extends CategoryService {
   constructor(
      protected readonly context: ContextService,
      @Inject(REPOSITORY) protected readonly repository: Repository<Category>,
   ) {
      super();
   }
}
