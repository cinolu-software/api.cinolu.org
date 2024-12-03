import { Module } from '@nestjs/common';
import { ProgramsService } from './services/programs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProgramsController } from './controllers/programs.controller';
import { ApplicationsController } from './controllers/applications.controller';
import { CategoriesController } from './controllers/categories.controller';
import { DocumentsController } from './controllers/documents.controller';
import { PhasesController } from './controllers/phases.controller';
import { RequirementsController } from './controllers/requirements.controller';
import { ReviewsController } from './controllers/reviews.controller';
import { TypesController } from './controllers/types.controller';
import { ApplicationsService } from './services/applications.service';
import { CategoriesService } from './services/categories.service';
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
  imports: [TypeOrmModule.forFeature([Program, Application, Category, Document, Phase, Requirement, Review, Type])],
  controllers: [
    ProgramsController,
    ApplicationsController,
    CategoriesController,
    DocumentsController,
    PhasesController,
    RequirementsController,
    ReviewsController,
    TypesController
  ],
  providers: [
    ProgramsService,
    ApplicationsService,
    CategoriesService,
    DocumentsService,
    DocumentsService,
    PhasesService,
    RequirementsService,
    ReviewsService,
    TypesService
  ]
})
export class ProgramsModule {}
