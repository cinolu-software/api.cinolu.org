import { Module } from '@nestjs/common';
import { SubprogramsService } from './subprograms.service';
import { SubprogramsController } from './subprograms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subprogram } from './entities/subprogram.entity';
import { SubprogramSubscriber } from './subscribers/subprogram.subscriber';
import { EventsModule } from './events/events.module';
import { ProjectsModule } from './projects/projects.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [ProjectsModule, EventsModule, TypeOrmModule.forFeature([Subprogram]), MetricsModule],
  controllers: [SubprogramsController],
  providers: [SubprogramsService, SubprogramSubscriber]
})
export class SubprogramsModule {}
