import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { RolesModule } from '@/modules/users/roles/roles.module';
import { ProjectsModule } from '@/modules/projects/projects.module';
import { UsersImportService } from './users-import.service';
import { UsersImportController } from './users-import.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    ProjectsModule
  ],
  controllers: [UsersImportController],
  providers: [UsersImportService],
  exports: [UsersImportService]
})
export class UsersImportModule {}
