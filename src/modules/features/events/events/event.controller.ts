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
import { EventsService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Public } from 'src/common/decorators/public.decorator';
import { QueryParams } from './types/query-params.type';

@Controller('event')
export class EventsController {
  constructor(private readonly programsService: EventsService) {}

  @Post('')
  create(@Body() createProgramDto: CreateEventDto): Promise<{ data: Event }> {
    return this.programsService.create(createProgramDto);
  }

  @Public()
  @Get('')
  findAll(@Query() queryParams: QueryParams): Promise<{ data: { events: Event[]; count: number } }> {
    return this.programsService.findAll(queryParams);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Event }> {
    return this.programsService.findOne(id);
  }

  @Post('image/:id')
  @UseInterceptors(
    FileInterceptor('thumb', {
      storage: diskStorage({
        destination: './uploads/events',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<{ data: Event }> {
    return this.programsService.uploadImage(id, file);
  }

  @Post('attachment/:id')
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: diskStorage({
        destination: './uploads/attachments',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addAttachment(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<{ data: Event }> {
    return this.programsService.addAttachment(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateEventDto): Promise<{ data: Event }> {
    return this.programsService.update(id, updateProgramDto);
  }

  @Delete('attachment/:id')
  removeAttachment(@Param('id') id: string): Promise<void> {
    return this.programsService.removeAttachment(id);
  }

  @Delete('restore/:id')
  restore(@Param('id') id: string): Promise<void> {
    return this.programsService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.programsService.remove(id);
  }
}
