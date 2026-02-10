import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from './session.serializer';
import { UsersModule } from '@/modules/users/users.module';
import { AuthEmailService } from './auth-email.service';

@Module({
  imports: [PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, GoogleStrategy, AuthEmailService],
  exports: [AuthService]
})
export class AuthModule {}
