import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './modules/auth/auth.module';
import { RightsGuard } from './modules/auth/guards/rights.guard';
import { EmailModule } from './modules/email/email.module';
import { NotificationModule } from './modules/notifications/notifications.module';
import { ExpertisesModule } from './modules/users/expertises/expertises.module';
import { PositionsModule } from './modules/users/positions/positions.module';
import { RolesModule } from './modules/users/roles/roles.module';
import { UsersModule } from './modules/users/users/users.module';
import { EventsModule } from './modules/events/events/events.module';
import { EventTypesModule } from './modules/events/types/types.module';
import { PartnersModule } from './modules/partners/partners/partners.module';
import { PartnershipsModule } from './modules/partners/partnerships/partnerships.module';
import { ApplicationsModule } from './modules/programs/applications/applications/applications.module';
import { ReviewsModule } from './modules/programs/applications/reviews/reviews.module';
import { CategoriesModule } from './modules/programs/categories/categories.module';
import { DocumentsModule } from './modules/programs/phases/documents/documents.module';
import { PhasesModule } from './modules/programs/phases/phases/phase.module';
import { RequirementsModule } from './modules/programs/phases/requirements/requirements.module';
import { ProgramsModule } from './modules/programs/programs/programs.module';
import { ProgramTypesModule } from './modules/programs/types/types.module';
import { DatabaseModule } from './modules/database/database.module';

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
