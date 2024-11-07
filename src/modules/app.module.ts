import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './core/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './core/users/users.module';
import { DbModule } from './core/db/db.module';
import { RolesModule } from './core/roles/roles.module';
import { PartnersModule } from './features/programs/partners/partners.module';
import { PartnershipsModule } from './features/programs/partnerships/partnerships.module';
import { ProgramsModule } from './features/programs/programs/programs.module';
import { RequirementsModule } from './features/programs/requirements/requirements.module';
import { TypesModule as ProgramTypesModule } from './features/programs/types/types.module';
import { ExpertisesModule } from './features/users/expertises/expertises.module';
import { AttachmentsModule } from './utilities/attachments/attachments.module';
import { EmailModule } from './utilities/email/email.module';
import { NotificationModule } from './utilities/notifications/notifications.module';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { PositionsModule } from './features/users/positions/positions.module';
import { CategoriesModule } from './features/programs/categories/categories.module';
import { EventsModule } from './features/events/events/event.module';
import { TypesModule as EventTypesModules } from './features/events/types/types.module';

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
    ProgramsModule,
    AttachmentsModule,
    RequirementsModule,
    ProgramTypesModule,
    NotificationModule,
    PartnersModule,
    PartnershipsModule,
    ExpertisesModule,
    PositionsModule,
    CategoriesModule,
    EventsModule,
    EventTypesModules
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }]
})
export class AppModule {}
