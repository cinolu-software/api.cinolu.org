import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Program } from '../programs/core/entities/program.entity';
import { Subprogram } from '../programs/subprograms/core/entities/subprogram.entity';
import { Article } from '../blog/articles/entities/article.entity';
import { Project } from '../programs/projects/core/entities/project.entity';
import { Event } from '../programs/events/core/entities/event.entity';
import { HighlightedItems } from './types/highlighted-items.type';

@Injectable()
export class HighlightsService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<HighlightedItems> {
    const [programs, subprograms, events, projects, articles] = await Promise.all([
      this.findHighlightedPrograms(),
      this.findHighlightedSubprograms(),
      this.findHighlightedEvents(),
      this.findHighlightedProjects(),
      this.findHighlightedArticles()
    ]);

    return { programs, subprograms, events, projects, articles };
  }

  private async findHighlightedPrograms(): Promise<Program[]> {
    return await this.dataSource.getRepository(Program).find({
      where: { is_highlighted: true }
    });
  }

  private async findHighlightedSubprograms(): Promise<Subprogram[]> {
    return await this.dataSource.getRepository(Subprogram).find({
      where: { is_highlighted: true }
    });
  }

  private async findHighlightedEvents(): Promise<Event[]> {
    return await this.dataSource.getRepository(Event).find({
      where: { is_highlighted: true }
    });
  }

  private async findHighlightedProjects(): Promise<Project[]> {
    return await this.dataSource.getRepository(Project).find({
      where: { is_highlighted: true }
    });
  }

  private async findHighlightedArticles(): Promise<Article[]> {
    return await this.dataSource.getRepository(Article).find({
      where: { is_highlighted: true }
    });
  }
}
