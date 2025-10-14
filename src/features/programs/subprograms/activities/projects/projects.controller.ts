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
import { UseRoles } from 'nest-access-control';
import { Public } from 'src/shared/decorators/public.decorator';
import { CreateIndicatorDto } from '../indicators/dto/create-indicator.dto';
import { Indicator } from '../indicators/entities/indicator.entity';
import { Gallery } from 'src/features/galleries/entities/gallery.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('')
  @UseRoles({ resource: 'projects', action: 'create' })
  create(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(dto);
  }

  @Get('')
  @UseRoles({ resource: 'projects', action: 'read' })
  findAll(@Query() qp: FilterProjectsDto): Promise<[Project[], number]> {
    return this.projectsService.findAll(qp);
  }

  @Get('find-recent')
  @Public()
  findRecent(): Promise<Project[]> {
    return this.projectsService.findRecent();
  }

  @Get('find-published')
  @Public()
  findPublished(@Query() queryParams: FilterProjectsDto): Promise<[Project[], number]> {
    return this.projectsService.findPublished(queryParams);
  }

  @Get('slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Project> {
    return this.projectsService.findBySlug(slug);
  }

  @Get(':id')
  @UseRoles({ resource: 'projects', action: 'read' })
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Post('indicators/:id')
  @UseRoles({ resource: 'projects', action: 'update' })
  addIndicators(@Param('id') id: string, @Body() dtos: CreateIndicatorDto[]): Promise<Indicator[]> {
    return this.projectsService.addIndicators(id, dtos);
  }

  @Post('gallery/:id')
  @UseRoles({ resource: 'projects', action: 'update' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/galleries/projects',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addGallery(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Gallery> {
    return this.projectsService.addGallery(id, file);
  }

  @Post('gallery/remove/:id/:galleryId')
  @UseRoles({ resource: 'projects', action: 'update' })
  removeGallery(@Param('id') id: string, @Param('galleryId') galleryId: string): Promise<void> {
    return this.projectsService.removeGallery(id, galleryId);
  }

  @Get('gallery/:slug')
  @Public()
  findGallery(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.projectsService.findGallery(slug);
  }

  @Post('publish/:id')
  @UseRoles({ resource: 'projects', action: 'update' })
  togglePublish(@Param('id') id: string): Promise<Project> {
    return this.projectsService.togglePublish(id);
  }

  @Post('cover/:id')
  @UseRoles({ resource: 'projects', action: 'update' })
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
  @UseRoles({ resource: 'projects', action: 'update' })
  removeCover(@Param('id') id: string): Promise<Project> {
    return this.projectsService.removeCover(id);
  }

  @Patch('highlight/:id')
  @UseRoles({ resource: 'projects', action: 'update' })
  toggleHighlight(@Param('id') id: string): Promise<Project> {
    return this.projectsService.highlight(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'projects', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto): Promise<Project> {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'projects', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(id);
  }
}
