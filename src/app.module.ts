import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './app/modules/auth/auth.module';
import { RolesModule } from './app/modules/roles/roles.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './app/modules/auth/guards/auth.guard';
import { RolesGuard } from './app/modules/auth/guards/roles.guard';
import { EmailModule } from './app/modules/email/email.module';
import { DatabaseModule } from './app/modules/database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SearchModule } from './app/modules/search/search.module';
import { ProgramsModule } from './app/modules/programs/programs.module';
import { AttachmentsModule } from './app/modules/attachments/attachments.module';
import { RequirementsModule } from './app/modules/requirements/requirements.module';
import { TypesModule } from './app/modules/types/types.module';
import { UsersModule } from './app/modules/users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../'),
      renderPath: '/uploads'
    }),
    ConfigModule.forRoot({
      isGlobal: true
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
    TypesModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
