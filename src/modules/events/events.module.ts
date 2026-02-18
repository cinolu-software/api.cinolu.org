import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventParticipation } from './entities/event-participation.entity';
import { EventSubscriber } from './subscribers/event.subscriber';
import { GalleriesModule } from '@/modules/galleries/galleries.module';
import { EventCategoriesModule } from './categories/categories.module';
import { EventMediaService } from './services/event-media.service';
import { EventParticipationService } from './services/event-participation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventParticipation]), EventCategoriesModule, GalleriesModule],
  controllers: [EventsController],
  providers: [EventsService, EventMediaService, EventParticipationService, EventSubscriber],
  exports: [EventsService]
})
export class EventsModule {}
