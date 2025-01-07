import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { Requirement } from './entities/requirement.entity';
import { Phase } from './entities/phase.entity';
import { DocumentsController } from './controllers/documents.controller';
import { RequirementsController } from './controllers/requirements.controller';
import { PhasesController } from './controllers/phases.controller';
import { DocumentsService } from './services/documents.service';
import { RequirementsService } from './services/requirements.service';
import { PhasesService } from './services/phases.service';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Phase, Requirement])],
  controllers: [DocumentsController, RequirementsController, PhasesController],
  providers: [DocumentsService, RequirementsService, PhasesService]
})
export class PhasesModule {}
