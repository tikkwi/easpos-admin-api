import { CoreModule } from '@common/core/core.module';
import { GrpcAuthGuard } from '@common/guard/grpc_auth.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthCredentialModule } from './auth_credential/auth_credential.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from '@common/constant';

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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GrpcAuthGuard,
    },
  ],
})
export class GrpcModule {}
