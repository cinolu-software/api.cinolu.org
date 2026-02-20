import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhaseDeliverable } from './entities/deliverable.entity';
import { Phase } from '../entities/phase.entity';
import { PhaseDeliverablesService } from './services/deliverables.service';
import { PhaseDeliverablesController } from './deliverables.controller';
import { PhasesService } from '../services/phases.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhaseDeliverable, Phase])],
  providers: [PhaseDeliverablesService, PhasesService],
  controllers: [PhaseDeliverablesController]
})
export class ProjectDeliverablesModule {}
