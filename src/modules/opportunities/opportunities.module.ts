import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpportunitiesService } from './opportunities.service';
import { OpportunitiesController } from './opportunities.controller';
import { Opportunity } from './entities/opportunity.entity';
import { OpportunityAttachment } from './entities/attachment.entity';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Opportunity, OpportunityAttachment]), TagsModule],
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService]
})
export class OpportunitiesModule {}
