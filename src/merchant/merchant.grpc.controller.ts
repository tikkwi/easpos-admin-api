import { GrpcHandler } from '@common/decorator';
import { MerchantService } from './merchant.service';
import { FindByIdDto } from '@common/dto';

@GrpcHandler()
export class MerchantGrpcController {
  constructor(private readonly service: MerchantService) {}

  async getMerchant(dto: FindByIdDto) {
    return this.service.getMerchant(dto);
  }

  async merchantWithAuth(dto: FindByIdDto) {
    return this.service.merchantWithAuth(dto);
  }
}
