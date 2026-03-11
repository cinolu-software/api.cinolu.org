import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ProgramsService } from './services/programs.service';
import { ProgramMediaService } from './services/program-media.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './entities/program.entity';
import { FilterProgramsDto } from './dto/filter-programs.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createDiskUploadOptions } from '@/core/helpers/upload.helper';
import { Public } from 'nestjs-session-auth';
import { Rbac } from 'nestjs-session-auth';

@Controller('programs')
export class ProgramsController {
  constructor(
    private readonly programsService: ProgramsService,
    private readonly programMediaService: ProgramMediaService
  ) {}

  @Post()
  @Rbac({ resource: 'programs', action: 'create' })
  create(@Body() dto: CreateProgramDto): Promise<Program> {
    return this.programsService.create(dto);
  }

  @Get('published')
  @Public()
  findPublished(): Promise<Program[]> {
    return this.programsService.findPublished();
  }

  @Patch(':programId/publish')
  @Rbac({ resource: 'programs', action: 'update' })
  togglePublish(@Param('programId') programId: string): Promise<Program> {
    return this.programsService.togglePublish(programId);
  }

  @Post(':programId/logo')
  @Rbac({ resource: 'programs', action: 'update' })
  @UseInterceptors(FileInterceptor('logo', createDiskUploadOptions('./uploads/programs')))
  addLogo(@Param('programId') programId: string, @UploadedFile() file: Express.Multer.File): Promise<Program> {
    return this.programMediaService.addLogo(programId, file);
  }

  @Get('by-slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Program> {
    return this.programsService.findBySlug(slug);
  }

  @Get()
  @Public()
  findAll(): Promise<Program[]> {
    return this.programsService.findAll();
  }

  @Get('paginated')
  @Rbac({ resource: 'programs', action: 'read' })
  findPaginated(@Query() query: FilterProgramsDto): Promise<[Program[], number]> {
    return this.programsService.findFiltered(query);
  }

  @Get(':programId')
  @Rbac({ resource: 'programs', action: 'update' })
  findOne(@Param('programId') programId: string): Promise<Program> {
    return this.programsService.findOne(programId);
  }

  @Patch(':programId/highlight')
  @Rbac({ resource: 'programs', action: 'update' })
  toggleHighlight(@Param('programId') programId: string): Promise<Program> {
    return this.programsService.highlight(programId);
  }

  @Patch(':programId')
  @Rbac({ resource: 'programs', action: 'update' })
  update(@Param('programId') programId: string, @Body() dto: UpdateProgramDto): Promise<Program> {
    return this.programsService.update(programId, dto);
  }

  @Delete(':programId')
  @Rbac({ resource: 'programs', action: 'delete' })
  remove(@Param('programId') programId: string): Promise<void> {
    return this.programsService.remove(programId);
  }
}
