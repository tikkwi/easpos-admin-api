import { Module } from '@nestjs/common';
import { AppConfigController } from './config.controller';
import { AppConfigService } from './config.service';
import { AppConfigGrpcController } from './config.grpc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig, AppConfigSchema } from './config.schema';
import { getRepositoryProvider } from '@common/utils/misc';

@Module({
   imports: [MongooseModule.forFeature([{ name: AppConfig.name, schema: AppConfigSchema }])],
   controllers: [AppConfigController, AppConfigGrpcController],
   providers: [AppConfigService, getRepositoryProvider({ name: AppConfig.name })],
   exports: [AppConfigService],
})
export class AppConfigModule {}
