import { AppService } from '@common/decorator/app_service.decorator';
import { ConfigService } from '@common/service/config.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppConfig } from '@app/config/config.schema';

@AppService()
export class AppConfigService extends ConfigService<AppConfig> {
   constructor(@Inject(REPOSITORY) protected readonly repository: Repository<AppConfig>) {
      super();
   }
}
