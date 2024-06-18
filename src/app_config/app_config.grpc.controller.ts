import { GrpcHandler } from '@app/decorator';
import { FindDto } from '@app/dto';
import { AppConfigService } from './app_config.service';

@GrpcHandler()
export class AppConfigGrpcController {
  constructor(private readonly service: AppConfigService) {}

  async getConfig(dto: FindDto) {
    return this.service.getConfig(dto);
  }
}
