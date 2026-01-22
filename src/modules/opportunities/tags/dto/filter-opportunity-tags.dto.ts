import { IsOptional, IsString } from 'class-validator';

export interface FilterOpportunityTagsDto {
  q?: string;
  page?: string;
}
