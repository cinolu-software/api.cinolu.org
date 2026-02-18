import { Module } from '@nestjs/common';
import { PhasesService } from './phases.service';
import { PhasesController } from './phases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phase } from './entities/phase.entity';
import { PhaseSubscriber } from './subscribers/phase.subscriber';
import { ProjectParticipation } from '@/modules/projects/entities/participation.entity';
import { PhaseDeliverable } from './entities/deliverable.entity';
import { PhaseDeliverableSubmission } from './entities/deliverable-submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phase, ProjectParticipation, PhaseDeliverable, PhaseDeliverableSubmission])],
  controllers: [PhasesController],
  providers: [PhasesService, PhaseSubscriber]
})
export class PhasesModule {}
