import { Injectable } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import BaseService from '@common/core/base/base.service';

@Injectable()
@Throttle({ default: {} })
export class TmpService extends BaseService {}
