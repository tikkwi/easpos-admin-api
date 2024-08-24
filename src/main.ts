import { HttpModule } from './http.module';
import { AppModule } from './app.module';
import { appBootstrap } from '@common/utils/bootstrap';
import { MERCHANT } from '@common/constant';

async function bootstrap() {
   await appBootstrap(HttpModule, 4000, { packages: [MERCHANT], module: AppModule });
}

bootstrap();
