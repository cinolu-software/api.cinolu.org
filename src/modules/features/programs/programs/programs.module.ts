import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProgramPhase } from './entities/phase.entity';
import { ProgramMilestone } from './entities/milestone.entity';
import { ProgramDocument } from './entities/document.entity';
import { ProgramApplication } from './entities/application.entity';
import { Requirement } from './entities/requirement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Program,
      Requirement,
      ProgramPhase,
      ProgramMilestone,
      ProgramDocument,
      ProgramApplication
    ])
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService]
})
export class ProgramsModule {}
