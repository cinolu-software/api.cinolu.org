import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventType } from './entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventType])],
  controllers: [TypesController],
  providers: [TypesService]
})
export class TypesModule {}
