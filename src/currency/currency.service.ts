import { AppService } from '@common/decorator/app_service.decorator';
import { UnitService } from '@common/service/unit/unit.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppCurrency } from '@app/currency/currency.schema';

@AppService()
export class AppCurrencyService extends UnitService {
   constructor(@Inject(REPOSITORY) protected readonly repository: Repository<AppCurrency>) {
      super();
   }
}
