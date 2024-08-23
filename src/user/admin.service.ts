import { AppService } from '@decorator/app_service.decorator';
import { UserService } from '@common_shared/user/user.service';
import { ContextService } from '@core/context/context.service';
import { AppRedisService } from '@core/app_redis/app_redis.service';
import { Repository } from '@core/repository';
import { Admin } from './admin.schema';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@constant/model.constant';
import { LoginDto } from '@common_shared/user/user.dto';

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
