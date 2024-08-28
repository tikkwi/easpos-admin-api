import { Admin } from './admin.schema';
import { Inject } from '@nestjs/common';
import { AppService } from '@common/decorator/app_service.decorator';
import { ContextService } from '@common/core/context/context.service';
import { AppRedisService } from '@common/core/app_redis/app_redis.service';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { LoginDto } from '@common/dto/global/user.dto';
import { UserService } from '@common/service/user/user.service';

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
