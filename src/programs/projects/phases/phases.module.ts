import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phase } from './entities/phase.entity';
import { PhasesService } from './phases.service';
import { DocumentsModule } from './documents/documents.module';
import { RequirementsModule } from './requirements/requirements.module';
import { PhasesController } from './phases.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Phase]), DocumentsModule, RequirementsModule],
  controllers: [PhasesController],
  providers: [PhasesService]
})
export class PhasesModule {}
