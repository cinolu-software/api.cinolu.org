import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpportunityTag } from './entities/opportunity-tag.entity';
import { OpportunityTagsController } from './opportunity-tags.controller';
import { OpportunityTagsService } from './opportunity-tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([OpportunityTag])],
  controllers: [OpportunityTagsController],
  providers: [OpportunityTagsService],
  exports: [OpportunityTagsService]
})
export class OpportunityTagsModule {}
