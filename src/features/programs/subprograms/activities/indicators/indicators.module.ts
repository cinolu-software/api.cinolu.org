import { Module } from '@nestjs/common';
import { IndicatorsService } from './indicators.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Indicator } from './entities/indicator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Indicator])],
  providers: [IndicatorsService],
  exports: [IndicatorsService]
})
export class IndicatorsModule {}
