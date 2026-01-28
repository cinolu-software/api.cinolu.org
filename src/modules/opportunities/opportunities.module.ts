import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpportunitiesService } from './opportunities.service';
import { OpportunitiesController } from './opportunities.controller';
import { Opportunity } from './entities/opportunity.entity';
import { OpportunityAttachment } from './entities/attachment.entity';
import { TagsModule } from './tags/tags.module';
import { OpportunitySubscriber } from './subscribers/opportunity.subscriber';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Opportunity, OpportunityAttachment]), TagsModule, UsersModule],
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService, OpportunitySubscriber]
})
export class OpportunitiesModule {}
