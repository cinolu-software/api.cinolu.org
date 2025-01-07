import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Review } from './entities/review.entity';
import { ApplicationsController } from './controllers/applications.controller';
import { ReviewsController } from './controllers/reviews.controller';
import { ApplicationsService } from './services/applications.service';
import { ReviewsService } from './services/reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Review])],
  controllers: [ApplicationsController, ReviewsController],
  providers: [ApplicationsService, ReviewsService]
})
export class ApplicationsModule {}
