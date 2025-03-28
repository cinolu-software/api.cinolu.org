import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phase } from './entities/phase.entity';
import { PhasesService } from './phases.service';
import { DocumentsModule } from './documents/documents.module';
import { PhasesController } from './phases.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Phase]), DocumentsModule],
  controllers: [PhasesController],
  providers: [PhasesService]
})
export class PhasesModule {}
