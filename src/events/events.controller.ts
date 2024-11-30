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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { QueryParams } from './types/query-params.type';
import { Rights } from '../shared/decorators/rights.decorators';
import { RightsEnum } from '../shared/enums/rights.enum';

@Controller('events')
@Rights(RightsEnum.Staff)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('')
  create(@Body() createProgramDto: CreateEventDto): Promise<{ data: Event }> {
    return this.eventsService.create(createProgramDto);
  }

  @Get('')
  @Rights(RightsEnum.Guest)
  findAll(@Query() queryParams: QueryParams): Promise<{ data: { events: Event[]; count: number } }> {
    return this.eventsService.findAll(queryParams);
  }

  @Get(':id')
  @Rights(RightsEnum.Guest)
  findOne(@Param('id') id: string): Promise<{ data: Event }> {
    return this.eventsService.findOne(id);
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
    return this.eventsService.uploadImage(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateEventDto): Promise<{ data: Event }> {
    return this.eventsService.update(id, updateProgramDto);
  }

  @Delete('restore/:id')
  restore(@Param('id') id: string): Promise<void> {
    return this.eventsService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(id);
  }
}
