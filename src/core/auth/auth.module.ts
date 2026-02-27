import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from './serializers/session.serializer';
import { UsersModule } from '@/modules/users/users.module';
import { AuthEmailService } from './services/auth-email.service';
import { AuthPasswordService } from './services/auth-password.service';
import { RbacService } from './rbac/rbac.service';
import { SYSTEM_RBAC_REGISTRATION } from './rbac/system-rbac';

@Global()
@Module({
  imports: [PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthPasswordService,
    LocalStrategy,
    SessionSerializer,
    GoogleStrategy,
    AuthEmailService,
    RbacService,
    SYSTEM_RBAC_REGISTRATION
  ],
  exports: [AuthService, RbacService]
})
export class AuthModule {}
