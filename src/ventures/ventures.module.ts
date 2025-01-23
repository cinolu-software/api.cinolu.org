import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venture } from './entities/venture.entity';
import { VenturesController } from './ventures.controller';
import { VenturesService } from './ventures.service';
import { SectorsModule } from './sectors/sectors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venture]), SectorsModule],
  controllers: [VenturesController],
  providers: [VenturesService]
})
export class VenturesModule {}
