import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource, ResourceType } from './entities/resource.entity';

@Controller('resources')
export class ResourcesController {
  constructor(private resourcesService: ResourcesService) {}

  @Post()
  @UseRoles({ resource: 'projects', action: 'create' })
  create(@Body() dto: CreateResourceDto): Promise<Resource> {
    return this.resourcesService.create(dto);
  }

  @Post('upload')
  @UseRoles({ resource: 'projects', action: 'create' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/projects/resources',
        filename: function (_req, file, cb) {
          const extension = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}.${extension}`);
        }
      })
    })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() dto: UpdateResourceDto): Promise<Resource> {
    let type = ResourceType.OTHER;
    if (file.mimetype.startsWith('image/')) type = ResourceType.IMAGE;
    else if (file.mimetype === 'application/pdf') type = ResourceType.PDF;
    const data: Omit<CreateResourceDto, 'url'> = {
      title: dto.title,
      type,
      phase: dto.phase,
      project: dto.project
    };
    return this.resourcesService.createWithFile(data, file);
  }

  @Get()
  @UseRoles({ resource: 'projects', action: 'read' })
  findAll(): Promise<Resource[]> {
    return this.resourcesService.findAll();
  }

  @Get('phase/:phaseId')
  @Public()
  findByPhase(@Param('phaseId') phaseId: string): Promise<Resource[]> {
    return this.resourcesService.findByPhase(phaseId);
  }

  @Get('project/:projectId')
  @Public()
  findByProject(@Param('projectId') projectId: string): Promise<Resource[]> {
    return this.resourcesService.findByProject(projectId);
  }

  @Get(':id')
  @UseRoles({ resource: 'projects', action: 'read' })
  findOne(@Param('id') id: string): Promise<Resource> {
    return this.resourcesService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'projects', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateResourceDto): Promise<Resource> {
    return this.resourcesService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'projects', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.resourcesService.remove(id);
  }
}
