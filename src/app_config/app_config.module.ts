import { Module } from '@nestjs/common';
import { AppConfigController } from './app_config.controller';
import { AppConfigService } from './app_config.service';
import { AppConfigGrpcController } from './app_config.grpc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig, AppConfigSchema } from '@common/schema/app_config.schema';
import { getRepositoryProvider } from '@common/utils/misc';

@Module({
  imports: [MongooseModule.forFeature([{ name: AppConfig.name, schema: AppConfigSchema }])],
  controllers: [AppConfigController, AppConfigGrpcController],
  providers: [AppConfigService, getRepositoryProvider({ name: AppConfig.name })],
  exports: [AppConfigService],
})
export class AppConfigModule {}
