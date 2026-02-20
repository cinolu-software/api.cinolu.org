import { Module } from '@nestjs/common';
import { PhasesService } from './services/phases.service';
import { PhasesController } from './phases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phase } from './entities/phase.entity';
import { PhaseSubscriber } from './subscribers/phase.subscriber';
import { ProjectDeliverablesModule } from './deliverables/deliverables.module';

@Module({
  imports: [ProjectDeliverablesModule, TypeOrmModule.forFeature([Phase])],
  providers: [PhasesService, PhaseSubscriber],
  controllers: [PhasesController],
  exports: [PhasesService]
})
export class PhasesModule {}
