import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from '@core/modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from '@core/modules/database/database.module';
import { RightsGuard } from '@core/modules/auth/guards/rights.guard';
import { EmailModule } from '@core/modules/email/email.module';
import { NotificationModule } from '@core/modules/notifications/notifications.module';
import { EventsModule } from './features/events/events/event.module';
import { PartnersModule } from './features/programs/partners/partners.module';
import { PartnershipsModule } from './features/programs/partnerships/partnerships.module';
import { ProgramsModule } from './features/programs/programs/programs.module';
import { ProgramTypesModule } from './features/programs/types/types.module';
import { EventTypesModule } from './features/events/types/types.module';
import { ProgramApplicationsModule } from './features/programs/applications/applications.module';
import { ProgramCategoriesModule } from './features/programs/categories/categories.module';
import { ProgramDocumentsModule } from './features/programs/documents/documents.module';
import { ProgramMilstonesModule } from './features/programs/milestones/milstones.module';
import { ProgramPhasesModule } from './features/programs/phases/phase.module';
import { ProgramRequirementsModule } from './features/programs/requirements/requirements.module';
import { ExpertisesModule } from '@core/modules/users/expertises/expertises.module';
import { PositionsModule } from '@core/modules/users/positions/positions.module';
import { RolesModule } from '@core/modules/users/roles/roles.module';
import { UsersModule } from '@core/modules/users/users/users.module';

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
    DatabaseModule,
    ProgramsModule,
    ProgramTypesModule,
    NotificationModule,
    PartnersModule,
    PartnershipsModule,
    ExpertisesModule,
    PositionsModule,
    EventsModule,
    EventTypesModule,
    ProgramApplicationsModule,
    ProgramCategoriesModule,
    ProgramDocumentsModule,
    ProgramMilstonesModule,
    ProgramPhasesModule,
    ProgramTypesModule,
    ProgramRequirementsModule
  ],
  providers: [{ provide: APP_GUARD, useClass: RightsGuard }]
})
export class AppModule {}
