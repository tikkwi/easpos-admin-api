import { CoreModule } from '@common/core/module/core.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthCredentialModule } from './auth_credential/auth_credential.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AUTH_CREDENTIAL, JWT_SECRET, USER } from '@common/constant';
import { GrpcAuthGuard } from '@common/guard/grpc_auth.guard';
import { getServiceToken } from '@common/utils/misc';
import { AuthCredentialService } from './auth_credential/auth_credential.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
   imports: [
      CoreModule,
      AuthCredentialModule,
      JwtModule.registerAsync({
         useFactory: (config: ConfigService) => ({
            global: true,
            secret: config.get(JWT_SECRET),
            signOptions: { expiresIn: '15d' },
         }),
         inject: [ConfigService],
      }),
      UserModule,
   ],
   providers: [
      { provide: getServiceToken(AUTH_CREDENTIAL), useExisting: AuthCredentialService },
      { provide: getServiceToken(USER), useExisting: UserService },
      { provide: APP_GUARD, useClass: GrpcAuthGuard },
   ],
})
export class GrpcModule {}
