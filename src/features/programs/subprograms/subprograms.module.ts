import { Module } from '@nestjs/common';
import { SubprogramsService } from './subprograms.service';
import { SubprogramsController } from './subprograms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subprogram } from './entities/subprogram.entity';
import { ProjectsModule } from './projects/projects.module';
import { EventsModule } from './events/events.module';
import { SubprogramSubscriber } from './subscribers/subprogram.subscriber';

@Module({
  imports: [ProjectsModule, EventsModule, TypeOrmModule.forFeature([Subprogram])],
  controllers: [SubprogramsController],
  providers: [SubprogramsService, SubprogramSubscriber]
})
export class SubprogramsModule {}
