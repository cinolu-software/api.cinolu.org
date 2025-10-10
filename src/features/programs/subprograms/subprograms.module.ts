import { Module } from '@nestjs/common';
import { SubprogramsService } from './subprograms.service';
import { SubprogramsController } from './subprograms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subprogram } from './entities/subprogram.entity';
import { SubprogramSubscriber } from './subscribers/subprogram.subscriber';
import { EventsModule } from './activities/events/events.module';
import { IndicatorsModule } from './activities/indicators/indicators.module';
import { ProjectsModule } from './activities/projects/projects.module';

@Module({
  imports: [ProjectsModule, EventsModule, IndicatorsModule, TypeOrmModule.forFeature([Subprogram])],
  controllers: [SubprogramsController],
  providers: [SubprogramsService, SubprogramSubscriber]
})
export class SubprogramsModule {}
