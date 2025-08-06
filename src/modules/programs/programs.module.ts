import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProjectsModule } from './projects/projects.module';
import { EventsModule } from './events/events.module';
import { ProgramSubscriber } from './subscribers/program.subscriber';

@Module({
  imports: [ProjectsModule, EventsModule, TypeOrmModule.forFeature([Program])],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramSubscriber]
})
export class ProgramsModule {}
