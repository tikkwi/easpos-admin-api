import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import AppService from '@common/decorator/app_service.decorator';
import AppConfig from './config.schema';
import Repository from '@common/core/repository';
import CoreService from '@common/core/core.service';

@AppService()
export class AppConfigService extends CoreService<AppConfig> {
   constructor(@Inject(REPOSITORY) protected readonly repository: Repository<AppConfig>) {
      super();
   }
}
