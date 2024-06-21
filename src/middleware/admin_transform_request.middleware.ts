import { AdminAppSharedServiceMethods } from '@common/dto/admin_app.dto';
import { TransformRequestMiddleware } from '@common/middleware/transform_request.middleware';

export class AdminTransformRequestMiddleware extends TransformRequestMiddleware {
  protected adminAppService: AdminAppSharedServiceMethods;
}
