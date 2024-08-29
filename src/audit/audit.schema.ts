import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Audit } from '@common/schema/audit.schema';

@Schema()
export class AppAudit extends Audit {}

export const AppAuditSchema = SchemaFactory.createForClass(AppAudit);
