import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';
import { EventsModule } from './programs/events/events.module';
import { PartnersModule } from './partners/partners.module';
import { ProjectsModule } from './programs/projects/projects.module';
import { UsersModule } from './users/users.module';
import { VenturesModule } from './ventures/ventures.module';
import { ProgramsModule } from './programs/programs.module';
import { ApplicationsModule } from './programs/projects/applications/applications.module';
import { BlogModule } from './blog/blog.module';
import { ChatModule } from './chat/chat.module';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';

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
    ProjectsModule,
    PartnersModule,
    EventsModule,
    VenturesModule,
    ProgramsModule,
    ApplicationsModule,
    BlogModule,
    ChatModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }
  ]
})
export class AppModule {}
