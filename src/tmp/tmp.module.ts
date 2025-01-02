import { Module } from '@nestjs/common';
import { TmpController } from './tmp.controller';
import { TmpService } from './tmp.service';

@Module({
   controllers: [TmpController],
   providers: [TmpService],
})
export class TmpModule {}
