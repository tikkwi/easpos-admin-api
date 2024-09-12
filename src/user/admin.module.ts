import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getRepositoryProvider } from '@common/utils/misc';
import Admin, { AdminSchema } from './admin.schema';
import AdminService from './admin.service';

@Module({
   imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
   providers: [AdminService, getRepositoryProvider({ name: Admin.name })],
})
export default class AdminModule {}
