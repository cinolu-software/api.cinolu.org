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
import { SubprogramsService } from './subprograms.service';
import { CreateSubprogramDto } from './dto/create-subprogram.dto';
import { UpdateSubprogramDto } from './dto/update-subprogram.dto';
import { Subprogram } from './entities/subprogram.entity';
import { FilterSubprogramDto } from './dto/filter-subprogram.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Public } from '@/core/auth/decorators/public.decorator';
import { UseRoles } from 'nest-access-control';

@Controller('subprograms')
export class SubprogramsController {
  constructor(private subprogramsService: SubprogramsService) {}

  @Post()
  @UseRoles({ resource: 'subprograms', action: 'create' })
  create(@Body() dto: CreateSubprogramDto): Promise<Subprogram> {
    return this.subprogramsService.create(dto);
  }

  @Get('')
  @Public()
  findAll(): Promise<Subprogram[]> {
    return this.subprogramsService.findAll();
  }

  @Post('publish/:id')
  @UseRoles({ resource: 'subprograms', action: 'update' })
  togglePublish(@Param('id') id: string): Promise<Subprogram> {
    return this.subprogramsService.togglePublish(id);
  }

  @Post('logo/:id')
  @UseRoles({ resource: 'subprograms', action: 'update' })
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/subprograms',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addLogo(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Subprogram> {
    return this.subprogramsService.addLogo(id, file);
  }

  @Get('slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Subprogram> {
    return this.subprogramsService.findBySlug(slug);
  }

  @Get('unpaginated/:id')
  @Public()
  findUnpaginated(@Param('id') id: string): Promise<Subprogram[]> {
    return this.subprogramsService.findUnpaginated(id);
  }

  @Get('paginated/:id')
  @UseRoles({ resource: 'subprograms', action: 'read' })
  findAllPaginated(
    @Param('id') id: string,
    @Query() queryParams: FilterSubprogramDto
  ): Promise<[Subprogram[], number]> {
    return this.subprogramsService.findAllPaginated(id, queryParams);
  }

  @Get(':id')
  @UseRoles({ resource: 'subprograms', action: 'update' })
  findOne(@Param('id') id: string): Promise<Subprogram> {
    return this.subprogramsService.findOne(id);
  }

  @Patch('highlight/:id')
  @UseRoles({ resource: 'subprograms', action: 'update' })
  toggleHighlight(@Param('id') id: string): Promise<Subprogram> {
    return this.subprogramsService.highlight(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'subprograms', action: 'update' })
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateSubprogramDto): Promise<Subprogram> {
    return this.subprogramsService.update(id, updateProgramDto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'subprograms', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.subprogramsService.remove(id);
  }
}
