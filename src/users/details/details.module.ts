import { Module } from '@nestjs/common';
import { DetailsService } from './details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detail } from './entities/detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Detail])],
  providers: [DetailsService],
  exports: [DetailsService]
})
export class DetailsModule {}
