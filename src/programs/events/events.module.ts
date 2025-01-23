import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { TypesModule } from './types/types.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), TypesModule],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
