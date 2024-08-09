import { REPOSITORY } from '@common/constant';
import { ContextService } from '@common/core/context/context.service';
import { CoreService } from '@common/core/service/core.service';
import { Repository } from '@common/core/repository';
import { AppService } from '@common/decorator/app_service.decorator';
import { AppConfigServiceMethods } from '@common/dto/app_config.dto';
import { Inject } from '@nestjs/common';

@AppService()
export class AppConfigService extends CoreService implements AppConfigServiceMethods {
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
