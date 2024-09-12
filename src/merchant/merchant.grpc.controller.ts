import { MerchantService } from './merchant.service';
import { FindByIdDto } from '@common/dto/core.dto';
import GrpcHandler from '@common/decorator/grpc_handler.decorator';

@GrpcHandler()
export default class MerchantGrpcController {
   constructor(private readonly service: MerchantService) {}

   async merchantWithAuth(dto: FindByIdDto) {
      return this.service.merchantWithAuth(dto);
   }

   tmpTst() {
      return this.service.tmpTst();
   }
}
