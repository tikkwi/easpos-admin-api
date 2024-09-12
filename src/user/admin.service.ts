import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import AppService from '@common/decorator/app_service.decorator';
import { UserService } from '@shared/user/user.service';
import AppRedisService from '@common/core/app_redis/app_redis.service';
import Repository from '@common/core/repository';
import Admin from './admin.schema';

@AppService()
export default class AdminService extends UserService {
   constructor(
      protected readonly db: AppRedisService,
      @Inject(REPOSITORY) protected readonly repository: Repository<Admin>,
   ) {
      super();
   }
}
