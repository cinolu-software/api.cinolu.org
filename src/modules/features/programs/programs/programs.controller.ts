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
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './entities/program.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { QueryParams } from './types/query-params.type';
import { Public } from 'src/modules/core/auth/decorators/public.decorator';
import { Roles } from 'src/modules/core/access-control/decorators/roles.decorators';
import { RolesEnum } from 'src/modules/core/access-control/enums/roles.enum';

@Controller('programs')
@Roles(RolesEnum.Staff)
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post('')
  create(@Body() createProgramDto: CreateProgramDto): Promise<{ data: Program }> {
    return this.programsService.create(createProgramDto);
  }

  @Get('')
  @Public()
  @Roles(RolesEnum.Guest)
  findAll(@Query() queryParams: QueryParams): Promise<{ data: { programs: Program[]; count: number } }> {
    return this.programsService.findAll(queryParams);
  }

  @Get(':id')
  @Public()
  @Roles(RolesEnum.Guest)
  findOne(@Param('id') id: string): Promise<{ data: Program }> {
    return this.programsService.findOne(id);
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
  uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<{ data: Program }> {
    return this.programsService.uploadImage(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto): Promise<{ data: Program }> {
    return this.programsService.update(id, updateProgramDto);
  }

  @Post('restore/:id')
  restore(@Param('id') id: string): Promise<void> {
    return this.programsService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.programsService.remove(id);
  }
}
