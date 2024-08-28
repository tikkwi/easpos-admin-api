import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { CategoryController } from '@common/service/category/category.controller';
import { AppCategoryService } from '@app/category/category.service';

@AppController('category', [EAllowedUser.Admin])
export class AppCategoryController extends CategoryController {
   constructor(protected readonly service: AppCategoryService) {
      super();
   }
}
