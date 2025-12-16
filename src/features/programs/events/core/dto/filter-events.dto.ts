export interface FilterEventsDto {
  page: string | null;
  q: string | null;
  categories: string[];
  filter?: 'all' | 'published' | 'drafts' | 'highlighted';
}
