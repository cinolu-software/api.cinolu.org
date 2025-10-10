import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Program } from '../programs/entities/program.entity';
import { Subprogram } from '../programs/subprograms/entities/subprogram.entity';
import { Article } from '../blog/articles/entities/article.entity';
import { Project } from '../programs/subprograms/activities/projects/entities/project.entity';
import { Event } from '../programs/subprograms/activities/events/entities/event.entity';

export interface HighlightedItems {
  programs: Program[];
  subprograms: Subprogram[];
  events: Event[];
  projects: Project[];
  articles: Article[];
}

@Injectable()
export class HighlightsService {
  constructor(private dataSource: DataSource) {}

  async findAll(): Promise<HighlightedItems> {
    const programs = await this.dataSource.getRepository(Program).find({
      where: { is_highlighted: true }
    });
    const subprograms = await this.dataSource.getRepository(Subprogram).find({
      where: { is_highlighted: true }
    });
    const events = await this.dataSource.getRepository(Event).find({
      where: { is_highlighted: true }
    });
    const projects = await this.dataSource.getRepository(Project).find({
      where: { is_highlighted: true }
    });
    const articles = await this.dataSource.getRepository(Article).find({
      where: { is_highlighted: true }
    });
    return { programs, subprograms, events, projects, articles };
  }
}
