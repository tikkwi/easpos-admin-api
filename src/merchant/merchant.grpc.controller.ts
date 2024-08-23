import { GrpcHandler } from '@decorator/grpc_handler.decorator';
import { FindByIdDto } from '@global_dto/core.dto';
import { CreateMerchantDto } from '@service_dto/merchant.dto';
import { MerchantService } from './merchant.service';

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
