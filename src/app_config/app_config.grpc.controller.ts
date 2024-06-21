import { GrpcHandler } from '@common/decorator/grpc_handler.decorator';
import { AppConfigService } from './app_config.service';
import { FindDto } from '@common/dto/core.dto';

@GrpcHandler()
export class AppConfigGrpcController {
  constructor(private readonly service: AppConfigService) {}

  async getConfig(dto: FindDto) {
    return this.service.getConfig(dto);
  }
}
