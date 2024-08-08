import { MERCHANT, USER } from '@common/constant';
import { appBootstrap } from '@common/utils/bootstrap';
import { HttpModule } from './http.module';
import { GrpcModule } from './grpc.module';

async function bootstrap() {
   await appBootstrap(HttpModule, 4000, { packages: [MERCHANT, USER], module: GrpcModule });
}
bootstrap();
