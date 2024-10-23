import { Module } from '@nestjs/common';
import { PartnershipsService } from './partnership.service';
import { PartnershipsController } from './partnership.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partnership } from './entities/partnership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partnership])],
  controllers: [PartnershipsController],
  providers: [PartnershipsService]
})
export class PartnershipsModule {}
