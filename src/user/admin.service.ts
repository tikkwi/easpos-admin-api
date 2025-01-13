import AppService from '@common/decorator/app_service.decorator';
import BaseService from '@common/core/base/base.service';
import { ModuleRef } from '@nestjs/core';

@AppService()
export default class AdminService extends BaseService {
   constructor(protected readonly moduleRef: ModuleRef) {
      super();
   }
}
