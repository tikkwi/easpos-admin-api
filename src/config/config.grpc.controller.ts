import { AppConfigService } from './config.service';
import { GrpcHandler } from '@common/decorator/grpc_handler.decorator';

@GrpcHandler()
export class AppConfigGrpcController {
   constructor(private readonly service: AppConfigService) {}

   async getConfig() {
      return this.service.getConfig();
   }
}
