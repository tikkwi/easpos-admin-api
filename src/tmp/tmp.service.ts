import { Injectable } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import BaseService from '@common/core/base/base.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
@Throttle({ default: {} })
export class TmpService extends BaseService {
   constructor(protected readonly moduleRef: ModuleRef) {
      super();
   }
}
