import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './admin.schema';
import { AdminService } from './admin.service';
import { getRepositoryProvider } from '@utils/misc';

@Module({
   imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
   providers: [AdminService, getRepositoryProvider({ name: Admin.name })],
})
export class AdminModule {}
