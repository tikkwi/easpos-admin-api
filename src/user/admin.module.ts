import { Module } from '@nestjs/common';
import AdminService from './admin.service';

@Module({
   providers: [AdminService],
})
export default class AdminModule {}
