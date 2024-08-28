import { AppController } from '@common/decorator/app_controller.decorator';
import { EAllowedUser } from '@common/utils/enum';
import { MailController } from '@common/service/mail/mail.controller';
import { AppMailService } from '@app/mail/mail.service';

@AppController('mail', [EAllowedUser.Admin])
export class AppMailController extends MailController {
   constructor(protected readonly service: AppMailService) {
      super();
   }
}
