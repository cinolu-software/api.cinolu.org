import { PartialType } from '@nestjs/swagger';
import { CreateOpportunityTagDto } from './create-opportunity-tag.dto';

export class UpdateOpportunityTagDto extends PartialType(CreateOpportunityTagDto) {}
