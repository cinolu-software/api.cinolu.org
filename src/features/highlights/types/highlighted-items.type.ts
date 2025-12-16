import { Program } from '../../programs/core/entities/program.entity';
import { Subprogram } from '../../programs/subprograms/core/entities/subprogram.entity';
import { Event } from '../../programs/events/core/entities/event.entity';
import { Project } from '../../programs/projects/core/entities/project.entity';
import { Article } from '../../blog/articles/entities/article.entity';

export interface HighlightedItems {
  programs: Program[];
  subprograms: Subprogram[];
  events: Event[];
  projects: Project[];
  articles: Article[];
}
