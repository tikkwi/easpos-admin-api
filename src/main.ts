import { appBootstrap } from '@utils/bootstrap';
import { HttpModule } from './http.module';
import { AppModule } from './app.module';
import { MERCHANT } from '@constant/model.constant';

async function bootstrap() {
   await appBootstrap(HttpModule, 4000, { packages: [MERCHANT], module: AppModule });
}

bootstrap();
