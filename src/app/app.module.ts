import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SearchModule } from './core/modules/search/search.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';
import { AuthModule } from './core/auth/auth.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { RequirementsModule } from './modules/requirements/requirements.module';
import { RolesModule } from './modules/roles/roles.module';
import { TypesModule } from './modules/types/types.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './core/modules/database/database.module';
import { EmailModule } from './core/modules/email/email.module';
import { NotificationModule } from './modules/notification/notification.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..'),
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
        signOptions: { expiresIn: '1h' }
      })
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    EmailModule,
    DatabaseModule,
    SearchModule,
    ProgramsModule,
    AttachmentsModule,
    RequirementsModule,
    TypesModule,
    NotificationModule
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }]
})
export class AppModule {}
