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
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Public } from '@/core/auth/decorators/public.decorator';
import { UseRoles } from 'nest-access-control';

@Controller('programs')
export class ProgramsController {
  constructor(
    private readonly programsService: ProgramsService,
    private readonly programMediaService: ProgramMediaService
  ) {}

  @Post()
  @UseRoles({ resource: 'programs', action: 'create' })
  create(@Body() dto: CreateProgramDto): Promise<Program> {
    return this.programsService.create(dto);
  }

  @Get('published')
  @Public()
  findPublished(): Promise<Program[]> {
    return this.programsService.findPublished();
  }

  @Patch(':programId/publish')
  @UseRoles({ resource: 'programs', action: 'update' })
  togglePublish(@Param('programId') programId: string): Promise<Program> {
    return this.programsService.togglePublish(programId);
  }

  @Post(':programId/logo')
  @UseRoles({ resource: 'programs', action: 'update' })
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/programs',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
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
  @UseRoles({ resource: 'programs', action: 'read' })
  findPaginated(@Query() query: FilterProgramsDto): Promise<[Program[], number]> {
    return this.programsService.findFiltered(query);
  }

  @Get(':programId')
  @UseRoles({ resource: 'programs', action: 'update' })
  findOne(@Param('programId') programId: string): Promise<Program> {
    return this.programsService.findOne(programId);
  }

  @Patch(':programId/highlight')
  @UseRoles({ resource: 'programs', action: 'update' })
  toggleHighlight(@Param('programId') programId: string): Promise<Program> {
    return this.programsService.highlight(programId);
  }

  @Patch(':programId')
  @UseRoles({ resource: 'programs', action: 'update' })
  update(@Param('programId') programId: string, @Body() dto: UpdateProgramDto): Promise<Program> {
    return this.programsService.update(programId, dto);
  }

  @Delete(':programId')
  @UseRoles({ resource: 'programs', action: 'delete' })
  remove(@Param('programId') programId: string): Promise<void> {
    return this.programsService.remove(programId);
  }
}
