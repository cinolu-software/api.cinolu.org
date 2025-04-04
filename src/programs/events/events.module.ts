import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { CategoriesModule } from './categories/categories.module';
import { EventSubscriber } from './subscribers/event.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), CategoriesModule],
  controllers: [EventsController],
  providers: [EventsService, EventSubscriber]
})
export class EventsModule {}
