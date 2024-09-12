import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getRepositoryProvider } from '@common/utils/misc';
import AllowanceCode from '@shared/allowance_code/allowance_code.schema';
import AppAllowanceCode, { AppAllowanceCodeSchema } from './allowance_code.schema';
import AllowanceCodeService from '@shared/allowance_code/allowance_code.service';
import AllowanceCodeController from '@shared/allowance_code/allowance_code.controller';
import AppAllowanceModule from '../allowance/allowance.module';

@Module({
   imports: [
      AppAllowanceModule,
      MongooseModule.forFeature([
         {
            name: AllowanceCode.name,
            schema: AppAllowanceCodeSchema,
         },
      ]),
   ],
   controllers: [AllowanceCodeController],
   providers: [AllowanceCodeService, getRepositoryProvider({ name: AppAllowanceCode.name })],
   exports: [AllowanceCodeService],
})
export default class AppAllowanceCodeModule {}
