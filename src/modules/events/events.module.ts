import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventParticipation } from './entities/participation.entity';
import { EventSubscriber } from './subscribers/event.subscriber';
import { GalleriesModule } from '@/modules/galleries/galleries.module';
import { EventCategoriesModule } from './categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventParticipation]), EventCategoriesModule, GalleriesModule],
  controllers: [EventsController],
  providers: [EventsService, EventSubscriber],
  exports: [EventsService]
})
export class EventsModule {}
