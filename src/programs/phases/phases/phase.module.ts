import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phase } from './entities/phase.entity';
import { PhasesController } from './phases.controller';
import { PhasesService } from './phases.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phase])],
  controllers: [PhasesController],
  providers: [PhasesService]
})
export class PhasesModule {}
