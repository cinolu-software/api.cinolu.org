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
import { Authorization } from '../../../../shared/decorators/rights.decorators';
import { RoleEnum } from '../../../../shared/enums/roles.enum';
import { CreateProgramDto } from '../dto/create-project.dto';
import { UpdateProgramDto } from '../dto/update-project.dto';
import { Project } from '../entities/project.entity';
import { ProjectsService } from '../services/projects.service';
import { QueryParams } from '../utils/query-params.type';

@Controller('projects')
@Authorization(RoleEnum.Staff)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('')
  create(@Body() createProgramDto: CreateProgramDto): Promise<{ data: Project }> {
    return this.projectsService.create(createProgramDto);
  }

  @Get('')
  findAll(): Promise<{ data: Project[] }> {
    return this.projectsService.findAll();
  }

  @Get('find-recent')
  @Authorization(RoleEnum.Guest)
  findRecent(): Promise<{ data: Project[] }> {
    return this.projectsService.findRecent();
  }

  @Get('find-published')
  @Authorization(RoleEnum.Guest)
  findPublished(@Query() queryParams: QueryParams): Promise<{ data: { projects: Project[]; count: number } }> {
    return this.projectsService.findPublished(queryParams);
  }

  @Get(':id')
  @Authorization(RoleEnum.Guest)
  findOne(@Param('id') id: string): Promise<{ data: Project }> {
    return this.projectsService.findOne(id);
  }

  @Post('publish/:id')
  publish(@Param('id') id: string): Promise<{ data: Project }> {
    return this.projectsService.publish(id);
  }

  @Post('image/:id')
  @UseInterceptors(
    FileInterceptor('thumb', {
      storage: diskStorage({
        destination: './uploads/programs',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<{ data: Project }> {
    return this.projectsService.addImage(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto): Promise<{ data: Project }> {
    return this.projectsService.update(id, updateProgramDto);
  }

  @Post('restore/:id')
  restore(@Param('id') id: string): Promise<{ data: Project }> {
    return this.projectsService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(id);
  }
}
