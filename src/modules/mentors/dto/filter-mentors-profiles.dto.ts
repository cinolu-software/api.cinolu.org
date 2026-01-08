import { MentorStatus } from '../enums/mentor.enum';

export interface FilterMentorsProfileDto {
  page: string | null;
  q: string | null;
  status: MentorStatus | null;
}
