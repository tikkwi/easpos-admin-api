import { FindByIdDto } from '@common/dto/core.dto';
import GrpcHandler from '@common/decorator/grpc_handler.decorator';
import MerchantService from './merchant.service';
import { getGrpcContext } from '@common/utils/misc';

@GrpcHandler()
export default class MerchantGrpcController {
   constructor(private readonly service: MerchantService) {}

   async merchantWithAuth(dto: FindByIdDto, meta: Metadata) {
      return this.service.merchantWithAuth(await getGrpcContext(meta), dto);
   }

   tmpTst() {
      return this.service.tmpTst();
   }
}
