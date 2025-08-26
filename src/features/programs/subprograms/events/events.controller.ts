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
import { FilterEventsDto } from './dto/filter-events.dto';
import { Public } from '../../../../shared/decorators/public.decorator';
import { UseRoles } from 'nest-access-control';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post('')
  @UseRoles({ resource: 'events', action: 'create' })
  create(@Body() dto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(dto);
  }

  @Get('')
  @UseRoles({ resource: 'events', action: 'read' })
  findAll(@Query() queryParams: FilterEventsDto): Promise<[Event[], number]> {
    return this.eventsService.findAll(queryParams);
  }

  @Get('find-recent')
  @Public()
  findRecent(): Promise<Event[]> {
    return this.eventsService.findRecent();
  }

  @Get('find-published')
  @Public()
  findPublished(@Query() queryParams: FilterEventsDto): Promise<[Event[], number]> {
    return this.eventsService.findPublished(queryParams);
  }

  @Get('slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Event> {
    return this.eventsService.findBySlug(slug);
  }

  @Get(':id')
  @UseRoles({ resource: 'events', action: 'read' })
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Post('publish/:id')
  @UseRoles({ resource: 'events', action: 'update' })
  togglePublish(@Param('id') id: string): Promise<Event> {
    return this.eventsService.togglePublish(id);
  }

  @Post('cover/:id')
  @UseRoles({ resource: 'events', action: 'update' })
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/events',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addCover(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Event> {
    return this.eventsService.addCover(id, file);
  }

  @Post('cover/remove/:id')
  @UseRoles({ resource: 'events', action: 'update' })
  removeCover(@Param('id') id: string): Promise<Event> {
    return this.eventsService.removeCover(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'events', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateEventDto): Promise<Event> {
    return this.eventsService.update(id, dto);
  }

  @Post('restore/:id')
  @UseRoles({ resource: 'events', action: 'update' })
  restore(@Param('id') id: string): Promise<void> {
    return this.eventsService.restore(id);
  }

  @Delete(':id')
  @UseRoles({ resource: 'events', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(id);
  }
}
