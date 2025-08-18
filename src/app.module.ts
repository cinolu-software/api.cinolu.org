import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './core/auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { EmailModule } from './core/email/email.module';
import { ProgramsModule } from './features/programs/programs.module';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { VenturesModule } from './features/ventures/ventures.module';
import { UsersModule } from './core/users/users.module';
import { BlogModule } from './features/blog/blog.module';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { AccessControlModule, ACGuard } from 'nest-access-control';
import { RBAC_POLICY } from './core/auth/guards/rbac-policy';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    AccessControlModule.forRoles(RBAC_POLICY),
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
    VenturesModule,
    BlogModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ACGuard },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }
  ]
})
export class AppModule {}
