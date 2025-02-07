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
import { Auth } from '../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { QueryParams } from './utils/query-params.type';

@Controller('projects')
@Auth(RoleEnum.Staff)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('')
  create(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(dto);
  }

  @Get('')
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get('find-recent')
  @Auth(RoleEnum.Guest)
  findRecent(): Promise<Project[]> {
    return this.projectsService.findRecent();
  }

  @Get('find-published')
  @Auth(RoleEnum.Guest)
  findPublished(@Query() queryParams: QueryParams): Promise<[Project[], number]> {
    return this.projectsService.findPublished(queryParams);
  }

  @Get(':id')
  @Auth(RoleEnum.Guest)
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Post('publish/:id')
  publish(@Param('id') id: string): Promise<Project> {
    return this.projectsService.publish(id);
  }

  @Post('image/:id')
  @UseInterceptors(
    FileInterceptor('thumb', {
      storage: diskStorage({
        destination: './uploads/projects',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Project> {
    return this.projectsService.addImage(id, file);
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
