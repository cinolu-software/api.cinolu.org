import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SubprogramsService } from './services/subprograms.service';
import { SubprogramMediaService } from './services/subprogram-media.service';
import { CreateSubprogramDto } from './dto/create-subprogram.dto';
import { UpdateSubprogramDto } from './dto/update-subprogram.dto';
import { Subprogram } from './entities/subprogram.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { createDiskUploadOptions } from '@/core/helpers/upload.helper';
import { Public } from '@/core/auth/decorators/public.decorator';
import { UseRoles } from 'nest-access-control';

@Controller('subprograms')
export class SubprogramsController {
  constructor(
    private readonly subprogramsService: SubprogramsService,
    private readonly subprogramMediaService: SubprogramMediaService
  ) {}

  @Post()
  @UseRoles({ resource: 'subprograms', action: 'create' })
  create(@Body() dto: CreateSubprogramDto): Promise<Subprogram> {
    return this.subprogramsService.create(dto);
  }

  @Get()
  @Public()
  findAll(): Promise<Subprogram[]> {
    return this.subprogramsService.findAll();
  }

  @Patch(':subprogramId/publish')
  @UseRoles({ resource: 'subprograms', action: 'update' })
  togglePublish(@Param('subprogramId') subprogramId: string): Promise<Subprogram> {
    return this.subprogramsService.togglePublish(subprogramId);
  }

  @Post(':subprogramId/logo')
  @UseRoles({ resource: 'subprograms', action: 'update' })
  @UseInterceptors(FileInterceptor('logo', createDiskUploadOptions('./uploads/subprograms')))
  addLogo(@Param('subprogramId') subprogramId: string, @UploadedFile() file: Express.Multer.File): Promise<Subprogram> {
    return this.subprogramMediaService.addLogo(subprogramId, file);
  }

  @Get('by-slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Subprogram> {
    return this.subprogramsService.findBySlug(slug);
  }

  @Get('program/:programId')
  @Public()
  findByProgram(@Param('programId') programId: string): Promise<Subprogram[]> {
    return this.subprogramsService.findUnpaginated(programId);
  }

  @Get(':subprogramId')
  @UseRoles({ resource: 'subprograms', action: 'update' })
  findOne(@Param('subprogramId') subprogramId: string): Promise<Subprogram> {
    return this.subprogramsService.findOne(subprogramId);
  }

  @Patch(':subprogramId/highlight')
  @UseRoles({ resource: 'subprograms', action: 'update' })
  toggleHighlight(@Param('subprogramId') subprogramId: string): Promise<Subprogram> {
    return this.subprogramsService.highlight(subprogramId);
  }

  @Patch(':subprogramId')
  @UseRoles({ resource: 'subprograms', action: 'update' })
  update(@Param('subprogramId') subprogramId: string, @Body() dto: UpdateSubprogramDto): Promise<Subprogram> {
    return this.subprogramsService.update(subprogramId, dto);
  }

  @Delete(':subprogramId')
  @UseRoles({ resource: 'subprograms', action: 'delete' })
  remove(@Param('subprogramId') subprogramId: string): Promise<void> {
    return this.subprogramsService.remove(subprogramId);
  }
}
