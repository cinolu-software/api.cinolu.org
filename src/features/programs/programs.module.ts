import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { ProgramSubscriber } from './subscribers/program.subscriber';
import { CategoriesModule } from './categories/categories.module';
import { Indicator } from './entities/indicator.entity';
import { MetricsModule } from './subprograms/metrics/metrics.module';

@Module({
  imports: [TypeOrmModule.forFeature([Program, Indicator]), CategoriesModule, MetricsModule],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramSubscriber]
})
export class ProgramsModule {}
