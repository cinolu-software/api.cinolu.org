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
import { Public } from 'src/common/decorators/public.decorator';
import { QueryParams } from './types/query-params.type';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post('')
  create(@Body() createProgramDto: CreateProgramDto): Promise<{ data: Program }> {
    return this.programsService.create(createProgramDto);
  }

  @Public()
  @Get('')
  findAll(@Query() queryParams: QueryParams): Promise<{ data: { programs: Program[]; count: number } }> {
    return this.programsService.findAll(queryParams);
  }

  @Public()
  @Get(':id')
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

  // @Post('attachment/:id')
  // @UseInterceptors(
  //   FileInterceptor('attachment', {
  //     storage: diskStorage({
  //       destination: './uploads/attachments',
  //       filename: function (_req, file, cb) {
  //         cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
  //       }
  //     })
  //   })
  // )
  // addAttachment(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<{ data: Program }> {
  //   return this.programsService.addAttachment(id, file);
  // }

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
