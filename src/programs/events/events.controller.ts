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
import { QueryParams } from './utils/query-params.type';
import { Auth } from '../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';

@Controller('events')
@Auth(RoleEnum.Staff)
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post('')
  create(@Body() createProgramDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createProgramDto);
  }

  @Get('')
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get('find-recent')
  @Auth(RoleEnum.Guest)
  findRecent(): Promise<Event[]> {
    return this.eventsService.findRecent();
  }

  @Get('find-published')
  @Auth(RoleEnum.Guest)
  findPublished(@Query() queryParams: QueryParams): Promise<[Event[], number]> {
    return this.eventsService.findPublished(queryParams);
  }

  @Get('slug/:slug')
  @Auth(RoleEnum.Guest)
  findBySlug(@Param('slug') slug: string): Promise<Event> {
    return this.eventsService.findBySlug(slug);
  }

  @Get(':id')
  @Auth(RoleEnum.Guest)
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Post('publish/:id')
  publish(@Param('id') id: string): Promise<Event> {
    return this.eventsService.publish(id);
  }

  @Post('cover/:id')
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
  removeCover(@Param('id') id: string): Promise<Event> {
    return this.eventsService.removeCover(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateEventDto): Promise<Event> {
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
