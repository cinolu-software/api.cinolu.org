import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ApplicationsService } from './applications.service';
import { ReviewsModule } from './reviews/reviews.module';
import { ApplicationsController } from './applications.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), ReviewsModule],
  controllers: [ApplicationsController],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
