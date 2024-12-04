import { Module } from '@nestjs/common';
import { CallsController } from './controllers/calls.controller';
import { CallsService } from './services/calls.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './entities/call.entity';
import { CallApplication } from './entities/application.entity';
import { CallApplicationReview } from './entities/review.entity';
import { ApplicationsService } from './services/application.service';
import { ReviewsService } from './services/review.service';
import { ApplicationsController } from './controllers/application.controller';
import { ReviewsController } from './controllers/reviews.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Call, CallApplication, CallApplicationReview])],
  controllers: [CallsController, ApplicationsController, ReviewsController],
  providers: [CallsService, ApplicationsService, ReviewsService]
})
export class CallsModule {}
