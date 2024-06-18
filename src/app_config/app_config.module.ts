import { Module } from '@nestjs/common';
import { AppConfigService } from './app_config.service';
import { AppConfigController } from './app_config.controller';
//import { getRepositoryProviders } from '@app/helper';
import { AppConfig, AppConfigSchema } from '@app/schema';

@Module({
  imports: [],
  controllers: [AppConfigController],
  providers: [
    AppConfigService,
    // ...getRepositoryProviders([{ name: AppConfig.name, schema: AppConfigSchema }]),
  ],
})
export class AppConfigModule {}
