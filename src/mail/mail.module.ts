import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppMail, AppMailSchema } from '@app/mail/mail.schema';
import { AppMailController } from '@app/mail/mail.controller';
import { AppMailService } from '@app/mail/mail.service';
import { getRepositoryProvider } from '@common/utils/misc';

@Module({
   imports: [MongooseModule.forFeature([{ name: AppMail.name, schema: AppMailSchema }])],
   controllers: [AppMailController],
   providers: [AppMailService, getRepositoryProvider({ name: AppMail.name })],
   exports: [AppMailService],
})
export class AppMailModule {}
