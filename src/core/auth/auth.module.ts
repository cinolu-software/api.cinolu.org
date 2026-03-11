import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from './serializers/session.serializer';
import { UsersModule } from '@/modules/users/users.module';
import { AuthEmailService } from './services/auth-email.service';
import { AuthPasswordService } from './services/auth-password.service';
import { SessionAuthModule } from 'nestjs-session-auth';
import { SYSTEM_RBAC_POLICY } from './rbac/system-rbac';

@Global()
@Module({
  imports: [
    UsersModule,
    SessionAuthModule.forRoot({ policies: [SYSTEM_RBAC_POLICY] }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthPasswordService,
    LocalStrategy,
    SessionSerializer,
    GoogleStrategy,
    AuthEmailService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
