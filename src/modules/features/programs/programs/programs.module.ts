import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProgramPhase } from './modules/phases/entities/phase.entity';
import { ProgramDocument } from './modules/documents/entities/document.entity';
import { ProgramApplication } from './modules/applications/entities/application.entity';
import { Requirement } from './modules/requirements/entities/requirement.entity';
import { ProgramMilestone } from './modules/milestones/entities/milestone.entity';
import { DocumentsController } from './modules/documents/documents.controller';
import { DocumentsService } from './modules/documents/documents.service';

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
  controllers: [ProgramsController, DocumentsController],
  providers: [ProgramsService, DocumentsService]
})
export class ProgramsModule {}
