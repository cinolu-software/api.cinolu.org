import { Module } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sector])],
  controllers: [SectorsController],
  providers: [SectorsService]
})
export class SectorsModule {}
