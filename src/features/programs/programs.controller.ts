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
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './entities/program.entity';
import { FilterProgramsDto } from './dto/filter-programs.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Public } from '../../shared/decorators/public.decorator';
import { UseRoles } from 'nest-access-control';

@Controller('programs')
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Post()
  @UseRoles({
    resource: 'programs',
    action: 'create'
  })
  create(@Body() dto: CreateProgramDto): Promise<Program> {
    return this.programsService.create(dto);
  }

  @Post('publish/:id')
  @UseRoles({
    resource: 'programs',
    action: 'update'
  })
  togglePublish(@Param('id') id: string): Promise<Program> {
    return this.programsService.togglePublish(id);
  }

  @Post('logo/:id')
  @UseRoles({
    resource: 'programs',
    action: 'update'
  })
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
  addLogo(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Program> {
    return this.programsService.addLogo(id, file);
  }

  @Get('slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Program> {
    return this.programsService.findBySlug(slug);
  }

  @Get('')
  @Public()
  findAll(): Promise<Program[]> {
    return this.programsService.findAll();
  }

  @Get('paginated')
  @UseRoles({
    resource: 'programs',
    action: 'read'
  })
  findAllPaginated(@Query() queryParams: FilterProgramsDto): Promise<[Program[], number]> {
    return this.programsService.findAllPaginated(queryParams);
  }

  @Get(':id')
  @UseRoles({
    resource: 'programs',
    action: 'update'
  })
  findOne(@Param('id') id: string): Promise<Program> {
    return this.programsService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({
    resource: 'programs',
    action: 'update'
  })
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto): Promise<Program> {
    return this.programsService.update(id, updateProgramDto);
  }

  @Delete(':id')
  @UseRoles({
    resource: 'programs',
    action: 'delete'
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.programsService.remove(id);
  }
}
