import { AppController } from '@common/decorator';
import { Body, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { CoreController } from '@common/core/core.controller';
import { CreateUserDto } from '@common/dto';
import { C_REQ } from '@common/constant';

@AppController('user')
export class UserController extends CoreController {
  constructor(service: UserService) {
    super(service);
  }

  @Post('create')
  async createUser(@Body() dto: Omit<CreateUserDto, 'request'>) {
    return this.service.createUser({ ...dto, request: this.context.get(C_REQ) });
  }
}
