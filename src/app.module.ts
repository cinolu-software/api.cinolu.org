import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AccessControlModule, ACGuard } from 'nest-access-control';
import { AuthModule } from './core/auth/auth.module';
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
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { MentorsModule } from './modules/mentors/mentors.module';
import { VenturesModule } from './modules/ventures/ventures.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

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
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configServie: ConfigService) => ({
        type: 'mariadb',
        port: +configServie.get('DB_PORT'),
        host: configServie.get('DB_HOST'),
        password: configServie.get('DB_PASSWORD'),
        database: configServie.get('DB_NAME'),
        username: configServie.get('DB_USERNAME'),
        subscribers: ['dist/**/*.subscriber.js'],
        entities: ['dist/**/*.entity.js'],
        autoLoadEntities: false,
        synchronize: false
      })
    }),
    MailerModule.forRoot({
      transport: {
        secure: true,
        host: process.env.MAIL_HOST,
        port: +process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
      },
      defaults: {
        from: `Support CINOLU <${process.env.MAIL_USERNAME}>`
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
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
    { provide: APP_GUARD, useClass: ACGuard },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }
  ]
})
export class AppModule {}
