import { IsIn, IsOptional } from 'class-validator';

export class FilterNotificationsDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  @IsIn(['all', 'read', 'unread'])
  status?: 'all' | 'read' | 'unread';
}
