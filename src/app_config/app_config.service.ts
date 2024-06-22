import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { AppConfigServiceMethods } from '@common/dto/app_config.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService implements AppConfigServiceMethods {
  constructor(@Inject(REPOSITORY) private readonly repository: Repository<AppConfig>) {}

  async getConfig() {
    return await this.repository.findOne({ filter: {} });
  }
}
