import { AppService } from '@common/decorator/app_service.decorator';
import { UserService } from '@common/shared/user/user.service';
import { ContextService } from '@common/core/context/context.service';
import { AppRedisService } from '@common/core/app_redis/app_redis.service';
import { Repository } from '@common/core/repository';
import { Admin } from './admin.schema';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { LoginDto } from '@common/shared/user/user.dto';

@AppService()
export class AdminService extends UserService {
   constructor(
      protected readonly context: ContextService,
      protected readonly db: AppRedisService,
      @Inject(REPOSITORY) protected readonly repository: Repository<Admin>,
   ) {
      super();
   }

   async loginUser(dto: LoginDto) {
      return await this.login(dto);
   }
}
