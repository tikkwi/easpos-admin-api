import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppAudit, AppAuditSchema } from '@app/audit/audit.schema';
import { AppAuditController } from '@app/audit/audit.controller';
import { AppAuditService } from '@app/audit/audit.service';

@Module({
   imports: [MongooseModule.forFeature([{ name: AppAudit.name, schema: AppAuditSchema }])],
   controllers: [AppAuditController],
   providers: [AppAuditService],
})
export class AppAuditModule {}
