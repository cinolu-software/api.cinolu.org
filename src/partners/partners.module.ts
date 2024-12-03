import { Module } from '@nestjs/common';
import { PartnersService } from './services/partners.service';
import { PartnersController } from './controllers/partners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './entities/partner.entity';
import { Partnership } from './entities/partnership.entity';
import { PartnershipsController } from './controllers/partnerships.controller';
import { PartnershipsService } from './services/partnerships.service';

@Module({
  imports: [TypeOrmModule.forFeature([Partner, Partnership])],
  controllers: [PartnersController, PartnershipsController],
  providers: [PartnersService, PartnershipsService]
})
export class PartnersModule {}
