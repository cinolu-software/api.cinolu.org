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
import { EventsService } from '../services/events.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { QueryParams } from '../utils/query-params.type';
import { Authorization } from '../../shared/decorators/rights.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';

@Controller('events')
@Authorization(RoleEnum.Staff)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('')
  create(@Body() createProgramDto: CreateEventDto): Promise<{ data: Event }> {
    return this.eventsService.create(createProgramDto);
  }

  @Post('publish/:id')
  publish(@Param('id') id: string): Promise<{ data: Event }> {
    return this.eventsService.publish(id);
  }

  @Get('find-latest')
  @Authorization(RoleEnum.Guest)
  findLatests(): Promise<{ data: Event[] }> {
    return this.eventsService.findLatests();
  }

  @Get('')
  @Authorization(RoleEnum.Guest)
  findAll(@Query() queryParams: QueryParams): Promise<{ data: { events: Event[]; count: number } }> {
    return this.eventsService.findAll(queryParams);
  }

  @Get(':id')
  @Authorization(RoleEnum.Guest)
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
    return this.eventsService.addImage(id, file);
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
