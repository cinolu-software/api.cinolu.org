import { Module } from '@nestjs/common';
import { ExpertisesService } from './expertises.service';
import { ExpertisesController } from './expertises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expertise } from './entities/expertise.entity';

@Module({
  controllers: [ExpertisesController],
  providers: [ExpertisesService],
  imports: [TypeOrmModule.forFeature([Expertise])]
})
export class ExpertisesModule {}
