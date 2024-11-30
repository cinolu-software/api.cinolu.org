import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { RightsGuard } from './auth/guards/rights.guard';
import { CategoriesModule } from './categories/categories.module';
import { DatabaseModule } from './database/database.module';
import { DocumentsModule } from './documents/documents.module';
import { EmailModule } from './email/email.module';
import { EventTypesModule } from './event-types/types.module';
import { EventsModule } from './events/events.module';
import { ExpertisesModule } from './expertises/expertises.module';
import { PartnersModule } from './partners/partners.module';
import { PartnershipsModule } from './partnerships/partnerships.module';
import { PhasesModule } from './phases/phase.module';
import { PositionsModule } from './positions/positions.module';
import { ProgramTypesModule } from './program-types/types.module';
import { ProgramsModule } from './programs/programs.module';
import { RequirementsModule } from './requirements/requirements.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

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
