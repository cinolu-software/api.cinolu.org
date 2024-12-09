import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './entities/sectors.entity';
import { Venture } from './entities/venture.entity';
import { VenturesController } from './controllers/ventures.controller';
import { VenturesService } from './services/ventures.service';
import { SectorsController } from './controllers/sectors.controller';
import { SectorsService } from './services/sectors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Venture, Sector])],
  controllers: [VenturesController, SectorsController],
  providers: [VenturesService, SectorsService]
})
export class VenturesModule {}
