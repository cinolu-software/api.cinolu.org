import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsReportService } from './programs-report.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProgramSubscriber } from './subscribers/program.subscriber';
import { Indicator } from './entities/indicator.entity';
import { ProgramCategoriesModule } from './categories/categories.module';

@Module({
  imports: [ProgramCategoriesModule, TypeOrmModule.forFeature([Program, Indicator])],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramsReportService, ProgramSubscriber],
  exports: [ProgramsService]
})
export class ProgramsModule {}
