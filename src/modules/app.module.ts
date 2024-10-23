import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SearchModule } from './utilities/search/search.module';
import { AuthModule } from './core/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './core/users/users.module';
import { DbModule } from './core/db/db.module';
import { RolesModule } from './core/roles/roles.module';
import { PartnersModule } from './features/program/partners/partners.module';
import { PartnershipsModule } from './features/program/partnerships/partnership.module';
import { ProgramsModule } from './features/program/programs/programs.module';
import { RequirementsModule } from './features/program/requirements/requirements.module';
import { TypesModule } from './features/program/types/types.module';
import { ExpertisesModule } from './features/user/expertises/expertises.module';
import { AttachmentsModule } from './utilities/attachments/attachments.module';
import { EmailModule } from './utilities/email/email.module';
import { NotificationModule } from './utilities/notifications/notifications.module';
import { AuthGuard } from './core/auth/guards/auth.guard';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
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
        signOptions: { expiresIn: '1d' }
      })
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    EmailModule,
    DbModule,
    SearchModule,
    ProgramsModule,
    AttachmentsModule,
    RequirementsModule,
    TypesModule,
    NotificationModule,
    PartnersModule,
    PartnershipsModule,
    ExpertisesModule
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }]
})
export class AppModule {}
