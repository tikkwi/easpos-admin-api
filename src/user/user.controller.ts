import { AppController } from '@common/decorator/app_controller.decorator';
import { CreateUserDto } from '@common/dto/user.dto';
import { Body, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

@AppController('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('create')
  async createUser(@Req() request: AppRequest, @Body() dto: CreateUserDto) {
    return this.service.createUser({ ...dto, request });
  }
}
