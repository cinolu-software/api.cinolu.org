import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhasesController } from './phases.controller';
import { PhasesService } from './phases.service';
import { Phase } from './entities/phase.entity';
import { ResourcesModule } from '../resources/resources.module';

@Module({
  imports: [ResourcesModule, TypeOrmModule.forFeature([Phase])],
  controllers: [PhasesController],
  providers: [PhasesService],
  exports: [PhasesService]
})
export class PhasesModule {}
