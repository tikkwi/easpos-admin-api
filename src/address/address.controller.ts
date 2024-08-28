import { AppController } from '@common/decorator/app_controller.decorator';
import { AddressController } from '@common/service/address/address.controller';
import { AppAddressService } from '@app/address/address.service';
import { EAllowedUser } from '@common/utils/enum';

@AppController('address', [EAllowedUser.Admin])
export class AppAddressController extends AddressController {
   constructor(protected readonly service: AppAddressService) {
      super();
   }
}
