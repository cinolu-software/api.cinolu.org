import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventType } from './entities/type.entity';
import { TypesController } from './controllers/types.controller';
import { TypesService } from './services/types.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventType])],
  controllers: [EventsController, TypesController],
  providers: [EventsService, TypesService]
})
export class EventsModule {}
