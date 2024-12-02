import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './auth/auth.module';
import { RightsGuard } from './auth/guards/rights.guard';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';
import { EventsModule } from './events/events.module';
import { PartnersModule } from './partners/partners.module';
import { ProgramsModule } from './programs/programs.module';
import { UsersModule } from './users/users.module';
import { EventTypesModule } from './events/types/types.module';
import { PartnershipsModule } from './partners/partnerships/partnerships.module';
import { ApplicationsModule } from './programs/applications/applications.module';
import { ReviewsModule } from './programs/applications/reviews/reviews.module';
import { CategoriesModule } from './programs/categories/categories.module';
import { DocumentsModule } from './programs/phases/documents/documents.module';
import { PhasesModule } from './programs/phases/phase.module';
import { RequirementsModule } from './programs/phases/requirements/requirements.module';
import { ProgramTypesModule } from './programs/types/types.module';
import { ExpertisesModule } from './users/expertises/expertises.module';
import { PositionsModule } from './users/positions/positions.module';
import { RolesModule } from './users/roles/roles.module';

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
