import { HttpModule } from './http.module';
import { AppModule } from './app.module';
import { MERCHANT } from '@common/constant';
import appBootstrap from '@common/utils/bootstrap';

async function bootstrap() {
   await appBootstrap(HttpModule, 4000, { packages: [MERCHANT], module: AppModule });
}

bootstrap();
