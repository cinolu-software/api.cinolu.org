import { IsOptional, IsString } from 'class-validator';

export class FilterOpportunitiesDto {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  filter?: 'all' | 'published' | 'drafts';
}
