import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './controllers/projects.controller';
import { ApplicationsController } from './controllers/applications.controller';
import { DocumentsController } from './controllers/documents.controller';
import { PhasesController } from './controllers/phases.controller';
import { RequirementsController } from './controllers/requirements.controller';
import { ReviewsController } from './controllers/reviews.controller';
import { TypesController } from './controllers/types.controller';
import { ApplicationsService } from './services/applications.service';
import { DocumentsService } from './services/documents.service';
import { PhasesService } from './services/phases.service';
import { ReviewsService } from './services/reviews.service';
import { RequirementsService } from './services/requirements.service';
import { TypesService } from './services/types.service';
import { Application } from './entities/application.entity';
import { Category } from './entities/category.entity';
import { Document } from './entities/document.entity';
import { Phase } from './entities/phase.entity';
import { Requirement } from './entities/requirement.entity';
import { Review } from './entities/review.entity';
import { Type } from './entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Application, Category, Document, Phase, Requirement, Review, Type])],
  controllers: [
    ProjectsController,
    ApplicationsController,
    DocumentsController,
    PhasesController,
    RequirementsController,
    ReviewsController,
    TypesController
  ],
  providers: [
    ProjectsService,
    ApplicationsService,
    DocumentsService,
    DocumentsService,
    PhasesService,
    RequirementsService,
    ReviewsService,
    TypesService
  ]
})
export class ProjectsModule {}
