export interface FilterProjectsDto {
  page: string | null;
  q: string | null;
  categories: string[];
  status: 'past' | 'current' | 'future' | null;
  filter?: 'all' | 'published' | 'drafts' | 'highlighted';
}
