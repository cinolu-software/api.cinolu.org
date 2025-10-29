import { Program } from '../../programs/entities/program.entity';
import { Subprogram } from '../../programs/subprograms/entities/subprogram.entity';
import { Event } from '../../programs/subprograms/events/entities/event.entity';
import { Project } from '../../programs/subprograms/projects/entities/project.entity';
import { Article } from '../../blog/articles/entities/article.entity';

export interface HighlightedItems {
  programs: Program[];
  subprograms: Subprogram[];
  events: Event[];
  projects: Project[];
  articles: Article[];
}
