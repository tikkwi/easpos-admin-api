import { MerchantService } from './merchant.service';
import { GrpcHandler } from '@common/decorator/grpc_handler.decorator';
import { FindByIdDto } from '@common/dto/global/core.dto';

@GrpcHandler()
export class MerchantGrpcController {
   constructor(private readonly service: MerchantService) {}

   async merchantWithAuth(dto: FindByIdDto) {
      return this.service.merchantWithAuth(dto);
   }

   tmpTst() {
      return this.service.tmpTst();
   }
}
