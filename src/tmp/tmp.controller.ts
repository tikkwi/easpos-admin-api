import { TmpService } from './tmp.service';
import AppController from '@common/decorator/app_controller.decorator';

@AppController('tmp')
export class TmpController {
   constructor(private readonly service: TmpService) {}
}
