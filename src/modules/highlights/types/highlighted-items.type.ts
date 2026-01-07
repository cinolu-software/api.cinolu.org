import { Article } from '@/modules/blog/articles/entities/article.entity';
import { Event } from '@/modules/events/entities/event.entity';
import { Program } from '@/modules/programs/entities/program.entity';
import { Project } from '@/modules/projects/entities/project.entity';
import { Subprogram } from '@/modules/subprograms/entities/subprogram.entity';

export interface HighlightedItems {
  programs: Program[];
  subprograms: Subprogram[];
  events: Event[];
  projects: Project[];
  articles: Article[];
}
