import { AppService } from '@common/decorator/app_service.decorator';
import { CurrencyService } from '@common/service/currency/currency.service';
import { ContextService } from '@common/core/context/context.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppCurrency } from '@app/currency/currency.schema';

@AppService()
export class AppCurrencyService extends CurrencyService {
   constructor(
      protected readonly context: ContextService,
      @Inject(REPOSITORY) protected readonly repository: Repository<AppCurrency>,
   ) {
      super();
   }

   async getBaseCurrency() {
      return await this.repository.findOne({ filter: { baseCurrency: true } });
   }
}
