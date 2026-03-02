import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './core/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { EventsModule } from './modules/events/events.module';
import { HighlightsModule } from './modules/highlights/highlights.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { StatsModule } from './modules/stats/stats.module';
import { SubprogramsModule } from './modules/subprograms/subprograms.module';
import { UsersModule } from './modules/users/users.module';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { MentorsModule } from './modules/mentors/mentors.module';
import { VenturesModule } from './modules/ventures/ventures.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { RbacGuard } from './core/auth/guards/rbac.guard';
import { GalleriesModule } from './shared/galleries/galleries.module';
import { CoreConfigModule } from './core/config/config.module';
import { JwtModule } from './core/jwt/jwt.module';
import { DatabaseModule } from './core/database/database.module';
import { StaticModule } from './core/static/static.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailModule } from './core/email/email.module';

@Module({
  imports: [
    CoreConfigModule,
    JwtModule,
    DatabaseModule,
    StaticModule,
    EventEmitterModule.forRoot(),
    EmailModule,
    AuthModule,
    UsersModule,
    VenturesModule,
    BlogModule,
    StatsModule,
    HighlightsModule,
    GalleriesModule,
    ProgramsModule,
    SubprogramsModule,
    EventsModule,
    ProjectsModule,
    MentorsModule,
    NotificationsModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RbacGuard },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }
  ]
})
export class AppModule {}
