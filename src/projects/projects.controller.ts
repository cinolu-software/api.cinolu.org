import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { validateFile } from 'src/pipes/file-validation.pipe';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('')
  create(@Body() createProjectDto: CreateProjectDto): Promise<{ data: Project }> {
    return this.projectsService.create(createProjectDto);
  }

  @Get('')
  findAll(): Promise<{ data: Project[] }> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Project }> {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<{ data: Project }> {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Post('attachment/:id')
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: diskStorage({
        destination: './uploads/attachments',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addAttachment(
    @Param('id') id: string,
    @UploadedFile(validateFile()) file: Express.Multer.File
  ): Promise<{ data: Project }> {
    return this.projectsService.addAttachment(+id, file);
  }

  @Delete('attachment/:id')
  removeAttachment(@Param('id') id: string): Promise<void> {
    return this.projectsService.removeAttachment(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(+id);
  }
}
