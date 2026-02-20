import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deliverable } from './entities/deliverable.entity';
import { DeliverableSubmission } from './entities/deliverable-submission.entity';
import { DeliverablesService } from './services/deliverables.service';
import { DeliverableSubmissionsService } from './services/deliverable-submissions.service';
import { DeliverablesController } from './deliverables.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deliverable, DeliverableSubmission])],
  providers: [DeliverablesService, DeliverableSubmissionsService],
  exports: [DeliverablesService, DeliverableSubmissionsService],
  controllers: [DeliverablesController]
})
export class ProjectDeliverablesModule {}
