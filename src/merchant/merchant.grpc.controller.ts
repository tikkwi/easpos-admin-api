import { MerchantService } from './merchant.service';
import { GrpcHandler } from '@common/decorator/grpc_handler.decorator';
import { FindByIdDto } from '@common/dto/global/core.dto';
import { CreateMerchantDto } from '@common/dto/service/merchant.dto';

@GrpcHandler()
export class MerchantGrpcController {
   constructor(private readonly service: MerchantService) {}

   async getMerchant(dto: FindByIdDto) {
      return this.service.getMerchant(dto);
   }

   async merchantWithAuth(dto: FindByIdDto) {
      return this.service.merchantWithAuth(dto);
   }

   async createMerchant(dto: CreateMerchantDto) {
      return this.service.createMerchant(dto);
   }

   tmpTst() {
      return this.service.tmpTst();
   }
}
