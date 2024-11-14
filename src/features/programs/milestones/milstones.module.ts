import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramMilestone } from './entities/milestone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramMilestone])],
  controllers: [],
  providers: []
})
export class ProgramMilstonesModule {}
