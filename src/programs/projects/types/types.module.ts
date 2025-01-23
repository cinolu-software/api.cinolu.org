import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { Type } from './entities/type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [TypesController],
  providers: [TypesService]
})
export class TypesModule {}
