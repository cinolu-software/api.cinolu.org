import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';
import { Partnership } from './partnerships/entities/partnership.entity';
import { PartnershipsController } from './partnerships/partnerships.controller';
import { PartnershipsService } from './partnerships/partnerships.service';
import { PartnershipsModule } from './partnerships/partnerships.module';

@Module({
  imports: [TypeOrmModule.forFeature([Partner, Partnership]), PartnershipsModule],
  controllers: [PartnersController, PartnershipsController],
  providers: [PartnersService, PartnershipsService]
})
export class PartnersModule {}
