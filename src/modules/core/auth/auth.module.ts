import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerializer } from './session.serializer';
import { EmailModule } from '../../utilities/email/email.module';

@Module({
  imports: [PassportModule, UsersModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, GoogleStrategy, SessionSerializer]
})
export class AuthModule {}
