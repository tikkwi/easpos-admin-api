import { Inject } from '@nestjs/common';
import { AppConfig } from './config.schema';
import { AppService } from '@common/decorator/app_service.decorator';
import { CoreService } from '@common/core/service/core.service';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { ContextService } from '@common/core/context/context.service';

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
