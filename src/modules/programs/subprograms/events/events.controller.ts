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
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { Metric } from '../metrics/entities/metric.entity';
import { MetricDto } from '../metrics/dto/metric.dto';

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

  @Post('metrics/:id')
  @UseRoles({ resource: 'events', action: 'update' })
  addMetrics(@Param('id') id: string, @Body() dto: MetricDto[]): Promise<Metric[]> {
    return this.eventsService.addMetrics(id, dto);
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

  @Post('gallery/:id')
  @UseRoles({ resource: 'events', action: 'update' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/galleries',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addGallery(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.eventsService.addGallery(id, file);
  }

  @Delete('gallery/remove/:id')
  @UseRoles({ resource: 'events', action: 'update' })
  removeGallery(@Param('id') id: string): Promise<void> {
    return this.eventsService.removeGallery(id);
  }

  @Get('gallery/:slug')
  @Public()
  findGallery(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.eventsService.findGallery(slug);
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

  @Patch('highlight/:id')
  @UseRoles({ resource: 'events', action: 'update' })
  toggleHighlight(@Param('id') id: string): Promise<Event> {
    return this.eventsService.highlight(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'events', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateEventDto): Promise<Event> {
    return this.eventsService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'events', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(id);
  }
}
