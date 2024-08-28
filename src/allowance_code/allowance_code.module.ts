import { Module } from '@nestjs/common';
import { AppAllowanceModule } from '@app/allowance/allowance.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
   AppAllowanceCode,
   AppAllowanceCodeSchema,
} from '@app/allowance_code/allowance_code.schema';
import { AppAllowanceCodeController } from '@app/allowance_code/allowance_code.controller';
import { AppAllowanceCodeService } from '@app/allowance_code/allowance_code.service';
import { getRepositoryProvider } from '@common/utils/misc';

@Module({
   imports: [
      AppAllowanceModule,
      MongooseModule.forFeature([
         {
            name: AppAllowanceCode.name,
            schema: AppAllowanceCodeSchema,
         },
      ]),
   ],
   controllers: [AppAllowanceCodeController],
   providers: [AppAllowanceCodeService, getRepositoryProvider({ name: AppAllowanceCode.name })],
   exports: [AppAllowanceCodeService],
})
export class AppAllowanceCodeModule {}
