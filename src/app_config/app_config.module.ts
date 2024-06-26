import { Module } from '@nestjs/common';
import { AppConfigController } from './app_config.controller';
import { AppConfigService } from './app_config.service';
import { AppConfigGrpcController } from './app_config.grpc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig, AppConfigSchema } from '@common/schema/app_config.schema';
import { getRepositoryProvider } from '@common/utils/misc';
import {
  ExceedLimitThreshold,
  ExceedLimitThresholdSchema,
} from '@shared/exceed_limit/exceed_limit_threshold.schema';
import { EXCEED_LIMIT_THRESHOLD } from '@common/constant';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppConfig.name, schema: AppConfigSchema },
      { name: ExceedLimitThreshold.name, schema: ExceedLimitThresholdSchema },
    ]),
  ],
  controllers: [AppConfigController, AppConfigGrpcController],
  providers: [
    AppConfigService,
    ...getRepositoryProvider([
      { name: AppConfig.name },
      { provide: EXCEED_LIMIT_THRESHOLD, name: ExceedLimitThreshold.name },
    ]),
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
