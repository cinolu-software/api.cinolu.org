export interface FilterArticlesDto {
  tags: string[];
  q: string | null;
  page: string | null;
}
