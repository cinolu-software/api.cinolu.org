import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { AttachmentsModule } from 'src/modules/attachments/attachments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), AttachmentsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
