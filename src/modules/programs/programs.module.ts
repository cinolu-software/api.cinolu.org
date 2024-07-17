import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { AttachmentsModule } from 'src/modules/attachments/attachments.module';
import { Requirement } from './entities/requirement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Program, Requirement]), AttachmentsModule],
  controllers: [ProgramsController],
  providers: [ProgramsService]
})
export class ProgramsModule {}
