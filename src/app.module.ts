import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './auth/auth.module';
import { RightsGuard } from './auth/guards/rights.guard';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';
import { EventsModule } from './events/events.module';
import { PartnersModule } from './partners/partners.module';
import { ProgramsModule } from './programs/programs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../../'),
      renderPath: '/uploads'
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }
      })
    }),
    AuthModule,
    UsersModule,
    EmailModule,
    DatabaseModule,
    ProgramsModule,
    PartnersModule,
    EventsModule
  ],
  providers: [{ provide: APP_GUARD, useClass: RightsGuard }]
})
export class AppModule {}
