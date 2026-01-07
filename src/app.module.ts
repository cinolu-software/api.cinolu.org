import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AccessControlModule, ACGuard } from 'nest-access-control';
import { AuthModule } from './core/auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { EmailModule } from './core/email/email.module';
import { RBAC_POLICY } from './core/auth/rbac-policy';
import { BlogModule } from './modules/blog/blog.module';
import { EventsModule } from './modules/events/events.module';
import { GalleriesModule } from './modules/galleries/galleries.module';
import { HighlightsModule } from './modules/highlights/highlights.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { StatsModule } from './modules/stats/stats.module';
import { SubprogramsModule } from './modules/subprograms/subprograms.module';
import { UsersModule } from './modules/users/users.module';
import { VenturesRootModule } from './modules/ventures/ventures-root.module';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { AuthGuard } from './core/auth/guards/auth.guard';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    AccessControlModule.forRoles(RBAC_POLICY),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../../'),
      renderPath: '/uploads'
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
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
    VenturesRootModule,
    BlogModule,
    StatsModule,
    HighlightsModule,
    GalleriesModule,
    ProgramsModule,
    SubprogramsModule,
    EventsModule,
    ProjectsModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ACGuard },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }
  ]
})
export class AppModule {}
