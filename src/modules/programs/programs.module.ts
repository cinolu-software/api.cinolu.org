import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProgramSubscriber } from './subscribers/program.subscriber';
import { ProgramCategoriesModule } from './categories/categories.module';

@Module({
  imports: [ProgramCategoriesModule, TypeOrmModule.forFeature([Program])],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramSubscriber],
  exports: [ProgramsService]
})
export class ProgramsModule {}
