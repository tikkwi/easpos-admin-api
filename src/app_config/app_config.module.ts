import { Module } from '@nestjs/common';
import { AppConfigController } from './app_config.controller';
import { AppConfigService } from './app_config.service';
import { AppConfigGrpcController } from './app_config.grpc.controller';

@Module({
  controllers: [AppConfigController, AppConfigGrpcController],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
