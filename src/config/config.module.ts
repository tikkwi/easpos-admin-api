import { Module } from '@nestjs/common';
import AppConfigController from './config.controller';
import { AppConfigService } from './config.service';
import { SCHEMA } from '@common/constant';
import { AppConfigSchema } from './config.schema';

@Module({
   controllers: [AppConfigController],
   providers: [AppConfigService, { provide: SCHEMA, useValue: AppConfigSchema }],
   exports: [AppConfigService],
})
export default class AppConfigModule {}
