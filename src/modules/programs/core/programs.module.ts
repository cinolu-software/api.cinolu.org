import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsReportService } from './programs-report.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProgramSubscriber } from './subscribers/program.subscriber';
import { CategoriesModule } from '../categories/categories.module';
import { Indicator } from './entities/indicator.entity';
import { ProjectsModule } from '../projects/core/projects.module';
import { EventsModule } from '../events/core/events.module';
import { SubprogramsModule } from '../subprograms/core/subprograms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Program, Indicator]),
    CategoriesModule,
    SubprogramsModule,
    ProjectsModule,
    EventsModule
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramsReportService, ProgramSubscriber],
  exports: [ProgramsService]
})
export class ProgramsModule {}
