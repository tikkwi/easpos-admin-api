import { AppController } from '@common/decorator/app_controller.decorator';
import { AddressController } from '@common/service/address/address.controller';
import { AppAddressService } from '@app/address/address.service';

@AppController('address')
export class AppAddressController extends AddressController {
   constructor(protected readonly service: AppAddressService) {
      super();
   }
}
