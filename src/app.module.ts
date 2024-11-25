import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events/events/events.module';
import { EventTypesModule } from './events/types/types.module';
import { PartnersModule } from './partners/partners/partners.module';
import { PartnershipsModule } from './partners/partnerships/partnerships.module';
import { ApplicationsModule } from './programs/applications/applications/applications.module';
import { ReviewsModule } from './programs/applications/reviews/reviews.module';
import { CategoriesModule } from './programs/categories/categories.module';
import { DocumentsModule } from './programs/phases/documents/documents.module';
import { PhasesModule } from './programs/phases/phases/phase.module';
import { RequirementsModule } from './programs/phases/requirements/requirements.module';
import { ProgramsModule } from './programs/programs/programs.module';
import { ProgramTypesModule } from './programs/types/types.module';
import { AuthModule } from './shared/modules/auth/auth.module';
import { RightsGuard } from './shared/modules/auth/guards/rights.guard';
import { EmailModule } from './shared/modules/email/email.module';
import { NotificationModule } from './shared/modules/notifications/notifications.module';
import { ExpertisesModule } from './shared/modules/users/expertises/expertises.module';
import { PositionsModule } from './shared/modules/users/positions/positions.module';
import { RolesModule } from './shared/modules/users/roles/roles.module';
import { UsersModule } from './shared/modules/users/users/users.module';
import { DatabaseModule } from './shared/modules/database/database.module';

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
    ApplicationsModule,
    CategoriesModule,
    DocumentsModule,
    PhasesModule,
    ProgramTypesModule,
    RequirementsModule,
    ReviewsModule,
    PhasesModule
  ],
  providers: [{ provide: APP_GUARD, useClass: RightsGuard }]
})
export class AppModule {}
