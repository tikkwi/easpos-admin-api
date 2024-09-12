import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AppAllowance, { AppAllowanceSchema } from './allowance.schema';
import AllowanceController from '@shared/allowance/allowance.controller';
import AllowanceService from '@shared/allowance/allowance.service';

@Module({
   imports: [MongooseModule.forFeature([{ name: AppAllowance.name, schema: AppAllowanceSchema }])],
   controllers: [AllowanceController],
   providers: [AllowanceService],
   exports: [AllowanceService],
})
export default class AppAllowanceModule {}
