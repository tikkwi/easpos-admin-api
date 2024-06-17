import { GrpcHandler } from '@app/decorator';
import { MerchantService } from './merchant.service';
import { FindByIdDto } from '@app/dto';

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
