import { Module } from '@nestjs/common';
import { SubprogramsService } from './services/subprograms.service';
import { SubprogramsController } from './subprograms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subprogram } from './entities/subprogram.entity';
import { SubprogramSubscriber } from './subscribers/subprogram.subscriber';
import { EventsModule } from '../events/events.module';
import { ProjectsModule } from '../projects/projects.module';
import { SubprogramMediaService } from './services/subprogram-media.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subprogram]), ProjectsModule, EventsModule],
  controllers: [SubprogramsController],
  providers: [SubprogramsService, SubprogramMediaService, SubprogramSubscriber]
})
export class SubprogramsModule {}
