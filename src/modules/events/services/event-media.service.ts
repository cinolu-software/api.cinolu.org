import { BadRequestException, Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { GalleriesService } from '@/modules/galleries/galleries.service';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { Event } from '../entities/event.entity';
import { EventsService } from './events.service';

@Injectable()
export class EventMediaService {
  constructor(
    private readonly galleriesService: GalleriesService,
    private readonly eventsService: EventsService
  ) {}

  async addGallery(eventId: string, file: Express.Multer.File): Promise<void> {
    try {
      await this.eventsService.findOne(eventId);
      const galleryDto = { image: file.filename, event: { id: eventId } };
      await this.galleriesService.create(galleryDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async removeGallery(galleryId: string): Promise<void> {
    try {
      await this.galleriesService.remove(galleryId);
    } catch {
      throw new BadRequestException();
    }
  }

  async findGallery(slug: string): Promise<Gallery[]> {
    try {
      return await this.galleriesService.findGallery('event', slug);
    } catch {
      throw new BadRequestException();
    }
  }

  async addCover(eventId: string, file: Express.Multer.File): Promise<Event> {
    try {
      const event = await this.eventsService.findOne(eventId);
      if (event.cover) {
        await fs.unlink(`./uploads/events/${event.cover}`).catch(() => undefined);
      }
      return await this.eventsService.setCover(eventId, file.filename);
    } catch {
      throw new BadRequestException();
    }
  }
}
