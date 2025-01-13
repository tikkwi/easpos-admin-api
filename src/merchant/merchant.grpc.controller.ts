import { FindByIdDto } from '@common/dto/core.dto';
import GrpcHandler from '@common/decorator/grpc_handler.decorator';
import MerchantService from './merchant.service';

@GrpcHandler()
export default class MerchantGrpcController {
   constructor(private readonly service: MerchantService) {}

   async merchantWithAuth(dto: FindByIdDto) {
      return this.service.merchantWithAuth(dto);
   }

   async tmpTst(dto) {
      return this.service.tmpTst(dto);
   }
}
