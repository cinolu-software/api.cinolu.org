import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramPhase } from './entities/phase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramPhase])],
  controllers: [],
  providers: []
})
export class PhasesModule {}
