import AppService from '@common/decorator/app_service.decorator';
import AppConfig from './config.schema';
import BaseService from '@common/core/base/base.service';
import { ModuleRef } from '@nestjs/core';

@AppService()
export class AppConfigService extends BaseService<AppConfig> {
   constructor(protected readonly moduleRef: ModuleRef) {
      super();
   }
}
