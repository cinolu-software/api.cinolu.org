import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { AttachmentsModule } from 'src/modules/utilities/attachments/attachments.module';
import { RequirementsModule } from '../requirements/requirements.module';

@Module({
  imports: [TypeOrmModule.forFeature([Program]), AttachmentsModule, RequirementsModule],
  controllers: [ProgramsController],
  providers: [ProgramsService]
})
export class ProgramsModule {}
