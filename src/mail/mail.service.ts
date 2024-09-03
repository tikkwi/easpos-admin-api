import { MailService } from '@common/service/mail.service';
import { ContextService } from '@common/core/context/context.service';
import { Inject } from '@nestjs/common';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { Mail } from '@common/schema/mail.schema';

export class AppMailService extends MailService {
   constructor(
      protected readonly context: ContextService,
      @Inject(REPOSITORY) protected readonly repository: Repository<Mail>,
   ) {
      super();
   }
}
