import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AppConfig, { AppConfigSchema } from './config.schema';
import AppConfigController from './config.controller';
import { AppConfigService } from './config.service';
import { getRepositoryProvider } from '@common/utils/misc';

@Module({
   imports: [MongooseModule.forFeature([{ name: AppConfig.name, schema: AppConfigSchema }])],
   controllers: [AppConfigController],
   providers: [AppConfigService, getRepositoryProvider({ name: AppConfig.name })],
   exports: [AppConfigService],
})
export default class AppConfigModule {}
