import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { CategoriesModule } from '../categories/categories.module';
import { EventSubscriber } from './subscribers/event.subscriber';
import { GalleriesModule } from '@/modules/galleries/galleries.module';
import { MetricsModule } from '@/modules/programs/subprograms/metrics/metrics.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), CategoriesModule, MetricsModule, GalleriesModule],
  controllers: [EventsController],
  providers: [EventsService, EventSubscriber],
  exports: [EventsService]
})
export class EventsModule {}
