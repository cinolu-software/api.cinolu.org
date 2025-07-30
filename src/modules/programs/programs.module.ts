import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProjectsModule } from './projects/projects.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [ProjectsModule, EventsModule, TypeOrmModule.forFeature([Program])],
  controllers: [ProgramsController],
  providers: [ProgramsService]
})
export class ProgramsModule {}
