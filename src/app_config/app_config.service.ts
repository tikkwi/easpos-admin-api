import { REPOSITORY } from '@constant/model.constant';
import { ContextService } from '@core/context/context.service';
import { CoreService } from '@core/service/core.service';
import { Repository } from '@core/repository';
import { AppService } from '@decorator/app_service.decorator';
import { Inject } from '@nestjs/common';
import { AppConfig } from './app_config.schema';

@AppService()
export class AppConfigService extends CoreService {
   constructor(
      @Inject(REPOSITORY) private readonly repository: Repository<AppConfig>,
      protected readonly context: ContextService,
   ) {
      super();
   }

   async getConfig() {
      return await this.repository.findOne({ filter: {} });
   }
}
