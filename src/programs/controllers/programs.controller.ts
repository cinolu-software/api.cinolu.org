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
import { Authorization } from '../../shared/decorators/rights.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';
import { CreateProgramDto } from '../dto/create-program.dto';
import { UpdateProgramDto } from '../dto/update-program.dto';
import { Program } from '../entities/program.entity';
import { ProgramsService } from '../services/programs.service';
import { QueryParams } from '../utils/query-params.type';

@Controller('programs')
@Authorization(RoleEnum.Staff)
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post('')
  create(@Body() createProgramDto: CreateProgramDto): Promise<{ data: Program }> {
    return this.programsService.create(createProgramDto);
  }
  @Get('find-latest')
  @Authorization(RoleEnum.Guest)
  findLatests(): Promise<{ data: Program[] }> {
    return this.programsService.findLatests();
  }

  @Get(':id')
  @Authorization(RoleEnum.Guest)
  findOne(@Param('id') id: string): Promise<{ data: Program }> {
    return this.programsService.findOne(id);
  }

  @Get('')
  findAll(): Promise<{ data: Program[] }> {
    return this.programsService.findAll();
  }

  @Get('find-published')
  @Authorization(RoleEnum.Guest)
  findPublished(@Query() queryParams: QueryParams): Promise<{ data: { programs: Program[]; count: number } }> {
    return this.programsService.findPublished(queryParams);
  }

  @Post('publish/:id')
  publish(@Param('id') id: string): Promise<{ data: Program }> {
    return this.programsService.publish(id);
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
  addImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<{ data: Program }> {
    return this.programsService.addImage(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto): Promise<{ data: Program }> {
    return this.programsService.update(id, updateProgramDto);
  }

  @Post('restore/:id')
  restore(@Param('id') id: string): Promise<{ data: Program }> {
    return this.programsService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.programsService.remove(id);
  }
}
