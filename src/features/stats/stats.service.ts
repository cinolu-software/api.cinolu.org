import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../../core/users/entities/user.entity';
import { Program } from '../programs/entities/program.entity';
import { Subprogram } from '../programs/subprograms/entities/subprogram.entity';
import { Project } from '../programs/subprograms/projects/entities/project.entity';
import { Article } from '../blog/articles/entities/article.entity';
import { Venture } from '../ventures/entities/venture.entity';
import { IAdminStats } from './types/admin-stats.type';
import { IUSerStats } from './types/user-stats.type';
import { Event } from '../programs/subprograms/events/entities/event.entity';




@Injectable()
export class StatsService {
  constructor(private dataSource: DataSource) {}

  async findAdminStats(): Promise<IAdminStats> {
    const userRepository = this.dataSource.getRepository(User);
    const programRepository = this.dataSource.getRepository(Program);
    const subprogramRepository = this.dataSource.getRepository(Subprogram);
    const projectRepository = this.dataSource.getRepository(Project);
    const eventRepository = this.dataSource.getRepository(Event);
    const articleRepository = this.dataSource.getRepository(Article);
    const [totalUsers, totalPrograms, totalSubprograms, totalProjects, totalEvents, totalArticles] = await Promise.all([
      userRepository.count(),
      programRepository.count(),
      subprogramRepository.count(),
      projectRepository.count(),
      eventRepository.count(),
      articleRepository.count()
    ]);
    return { totalUsers, totalPrograms, totalSubprograms, totalProjects, totalEvents, totalArticles };
  }

  async findUserStats(user: User): Promise<IUSerStats>  {
    const ventureRepository = this.dataSource.getRepository(Venture);
    const [totalVentures] = await Promise.all([ventureRepository.count({ where: { owner: { id: user.id } } })]);
    return { totalVentures };
  }
}
