import { Module } from '@nestjs/common';
import { PhasesService } from './services/phases.service';
import { PhasesController } from './phases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phase } from './entities/phase.entity';
import { PhaseSubscriber } from './subscribers/phase.subscriber';
import { ProjectParticipation } from '@/modules/projects/entities/project-participation.entity';
import { PhaseParticipantsService } from './services/participations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phase, ProjectParticipation])],
  providers: [PhasesService, PhaseParticipantsService, PhaseSubscriber],
  controllers: [PhasesController]
})
export class PhasesModule {}
