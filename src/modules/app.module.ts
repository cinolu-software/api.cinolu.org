import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SearchModule } from './utilities/search/search.module';
import { AuthModule } from './core/auth/auth.module';
import { ProgramsModule } from './features/programs/programs.module';
import { RequirementsModule } from './features/requirements/requirements.module';
import { RolesModule } from './core/roles/roles.module';
import { UsersModule } from './core/users/users.module';
import { DbModule } from './core/db/db.module';
import { EmailModule } from './core/email/email.module';
import { NotificationModule } from './utilities/notifications/notifications.module';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { AttachmentsModule } from './utilities/attachments/attachments.module';
import { PartnersModule } from './features/partners/partners.module';
import { PartnershipsModule } from './features/partnerships/partnership.module';
import { TypesModule } from './features/types/types.module';
import { ExpertisesModule } from './features/expertises/expertises.module';

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
