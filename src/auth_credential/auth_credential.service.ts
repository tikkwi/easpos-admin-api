import {
   AuthCredentialServiceMethods,
   GetAuthCredentialDto,
} from '@common/dto/auth_credential.dto';
import AppService from '@common/decorator/app_service.decorator';
import BaseService from '@common/core/base/base.service';
import { ModuleRef } from '@nestjs/core';

@AppService()
export default class AuthCredentialService
   extends BaseService<AuthCredential>
   implements AuthCredentialServiceMethods
{
   constructor(protected readonly moduleRef: ModuleRef) {
      super();
   }

   async create({ ctx, ...dto }) {
      const repository = await this.getRepository(ctx.connection, ctx.session);
      return await repository.create(dto as any);
   }

   async getAuthCredential({ ctx: { connection, session }, type }: GetAuthCredentialDto) {
      const repository = await this.getRepository(connection, session);
      return await repository.findOne({ filter: { type }, errorOnNotFound: true });
   }
}
