import { MERCHANT } from '@common/constant';
import { appBootstrap } from '@common/utils/bootstrap';
import { HttpModule } from './http.module';
import { AppModule } from './app.module';

async function bootstrap() {
   await appBootstrap(HttpModule, 4000, { packages: [MERCHANT], module: AppModule });
}

bootstrap();
