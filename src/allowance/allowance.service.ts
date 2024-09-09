import { AppService } from '@common/decorator/app_service.decorator';
import { AllowanceService } from '@common/service/allowance.service';
import { ContextService } from '@common/core/context.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppAllowance } from '@app/allowance/allowance.schema';
import { ProductService } from '@common/service/product.service';

@AppService()
export class AppAllowanceService extends AllowanceService {
   constructor(
      protected readonly context: ContextService,
      protected readonly productService: ProductService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppAllowance>,
   ) {
      super();
   }
}
