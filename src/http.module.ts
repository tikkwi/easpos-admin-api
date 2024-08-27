import { Module } from '@nestjs/common';
import { TmpModule } from '@app/tmp/tmp.module';
import { AppConfigModule } from '@app/config/config.module';
import { AppModule } from './app.module';
import { CoreHttpModule } from '@common/core/module/core_http.module';

@Module({
   imports: [CoreHttpModule, AppModule, AppConfigModule, TmpModule],
})
export class HttpModule {}
