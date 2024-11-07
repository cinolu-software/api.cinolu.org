import { Module } from '@nestjs/common';
import { EventsService } from './event.service';
import { EventsController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { AttachmentsModule } from 'src/modules/utilities/attachments/attachments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), AttachmentsModule],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
