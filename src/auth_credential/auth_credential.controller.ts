import { Body, Get, Post } from '@nestjs/common';
import AuthCredentialService from './auth_credential.service';
import AppController from '@common/decorator/app_controller.decorator';

@AppController('auth-credential')
export class AuthCredentialController {
   constructor(private readonly service: AuthCredentialService) {}

   @Post('create')
   async create(@Body() dto) {
      return this.service.create(dto);
   }

   @Get('test')
   async test() {
      return 'hi..';
   }
}
