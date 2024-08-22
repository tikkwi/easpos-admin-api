import { Module } from '@nestjs/common';
import { TmpModule } from '@shared/tmp/tmp.module';
import { AppConfigModule } from './app_config/app_config.module';
import { CoreHttpModule } from '@common/core/module/core_http.module';
import { AppModule } from './app.module';

@Module({
   imports: [CoreHttpModule, AppModule, AppConfigModule, TmpModule],
})
export class HttpModule {}
