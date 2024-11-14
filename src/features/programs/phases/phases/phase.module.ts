import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phase } from './entities/phase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phase])],
  controllers: [],
  providers: []
})
export class PhasesModule {}
