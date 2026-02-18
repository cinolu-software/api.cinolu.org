import { Module } from '@nestjs/common';
import { ProgramsService } from './services/programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProgramSubscriber } from './subscribers/program.subscriber';
import { ProgramCategoriesModule } from './categories/categories.module';
import { ProgramMediaService } from './services/program-media.service';

@Module({
  imports: [ProgramCategoriesModule, TypeOrmModule.forFeature([Program])],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramMediaService, ProgramSubscriber],
  exports: [ProgramsService]
})
export class ProgramsModule {}
