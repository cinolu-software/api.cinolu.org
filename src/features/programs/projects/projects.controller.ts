import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { FilterProjectsDto } from './dto/filter-projects.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('')
  create(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(dto);
  }

  @Get('')
  findAll(@Query() queryParams: FilterProjectsDto): Promise<[Project[], number]> {
    return this.projectsService.findAll(queryParams);
  }

  @Get('find-recent')
  findRecent(): Promise<Project[]> {
    return this.projectsService.findRecent();
  }

  @Get('find-published')
  findPublished(@Query() queryParams: FilterProjectsDto): Promise<[Project[], number]> {
    return this.projectsService.findPublished(queryParams);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string): Promise<Project> {
    return this.projectsService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Post('publish/:id')
  togglePublish(@Param('id') id: string): Promise<Project> {
    return this.projectsService.togglePublish(id);
  }

  @Post('cover/:id')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/projects',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addCover(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Project> {
    return this.projectsService.addCover(id, file);
  }

  @Post('cover/remove/:id')
  removeCover(@Param('id') id: string): Promise<Project> {
    return this.projectsService.removeCover(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto): Promise<Project> {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(id);
  }
}
