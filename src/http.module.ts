import { Module } from '@nestjs/common';
import { TmpModule } from '@app/tmp/tmp.module';
import { AppModule } from './app.module';
import CoreHttpModule from '@common/core/module/core_http.module';

@Module({
   imports: [CoreHttpModule, AppModule, TmpModule],
})
export class HttpModule {}
