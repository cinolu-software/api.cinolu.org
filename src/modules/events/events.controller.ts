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
import { EventsService } from './services/events.service';
import { EventMediaService } from './services/event-media.service';
import { EventParticipationService } from './services/event-participation.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FilterEventsDto } from './dto/filter-events.dto';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventMediaService: EventMediaService,
    private readonly eventParticipationService: EventParticipationService
  ) {}

  @Post()
  @UseRoles({ resource: 'events', action: 'create' })
  create(@Body() dto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(dto);
  }

  @Get()
  @UseRoles({ resource: 'events', action: 'read' })
  findAll(@Query() query: FilterEventsDto): Promise<[Event[], number]> {
    return this.eventsService.findAll(query);
  }

  @Get('recent')
  @Public()
  findRecent(): Promise<Event[]> {
    return this.eventsService.findRecent();
  }

  @Get('published')
  @Public()
  findPublished(@Query() query: FilterEventsDto): Promise<[Event[], number]> {
    return this.eventsService.findPublished(query);
  }

  @Get('by-slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Event> {
    return this.eventsService.findBySlug(slug);
  }

  @Get(':eventId')
  @UseRoles({ resource: 'events', action: 'read' })
  findOne(@Param('eventId') eventId: string): Promise<Event> {
    return this.eventsService.findOne(eventId);
  }

  @Post(':eventId/participate')
  @UseRoles({ resource: 'events', action: 'update' })
  participate(@Param('eventId') eventId: string, @CurrentUser() user: User): Promise<Event> {
    return this.eventParticipationService.participate(eventId, user);
  }

  @Patch(':eventId/publish')
  @UseRoles({ resource: 'events', action: 'update' })
  togglePublish(@Param('eventId') eventId: string): Promise<Event> {
    return this.eventsService.togglePublish(eventId);
  }

  @Post(':eventId/gallery')
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
  addGallery(@Param('eventId') eventId: string, @UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.eventMediaService.addGallery(eventId, file);
  }

  @Delete('gallery/:galleryId')
  @UseRoles({ resource: 'events', action: 'update' })
  removeGallery(@Param('galleryId') galleryId: string): Promise<void> {
    return this.eventMediaService.removeGallery(galleryId);
  }

  @Get('by-slug/:slug/gallery')
  @Public()
  findGallery(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.eventMediaService.findGallery(slug);
  }

  @Post(':eventId/cover')
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
  addCover(@Param('eventId') eventId: string, @UploadedFile() file: Express.Multer.File): Promise<Event> {
    return this.eventMediaService.addCover(eventId, file);
  }

  @Patch(':eventId/highlight')
  @UseRoles({ resource: 'events', action: 'update' })
  toggleHighlight(@Param('eventId') eventId: string): Promise<Event> {
    return this.eventsService.highlight(eventId);
  }

  @Patch(':eventId')
  @UseRoles({ resource: 'events', action: 'update' })
  update(@Param('eventId') eventId: string, @Body() dto: UpdateEventDto): Promise<Event> {
    return this.eventsService.update(eventId, dto);
  }

  @Delete(':eventId')
  @UseRoles({ resource: 'events', action: 'delete' })
  remove(@Param('eventId') eventId: string): Promise<void> {
    return this.eventsService.remove(eventId);
  }
}
