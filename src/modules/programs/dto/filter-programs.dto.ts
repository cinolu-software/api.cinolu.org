import { PaginatedQueryDto } from '@/core/dto/paginated-query.dto';
import { IsIn, IsOptional } from 'class-validator';

export class FilterProgramsDto extends PaginatedQueryDto {
  @IsOptional()
  @IsIn(['all', 'published', 'drafts', 'highlighted'])
  filter?: 'all' | 'published' | 'drafts' | 'highlighted';
}
