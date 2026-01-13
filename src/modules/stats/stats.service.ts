import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Venture } from '../ventures/entities/venture.entity';
import { IUSerStats } from './types/user-stats.type';
import { IAdminStats } from './types/admin-stats.type';
import { Project } from '../projects/entities/project.entity';
import { Event } from '../events/entities/event.entity';
import { Program } from '../programs/entities/program.entity';
import { Subprogram } from '../subprograms/entities/subprogram.entity';
import { Article } from '../blog/articles/entities/article.entity';
import { Comment } from '../blog/comments/entities/comment.entity';
import { MentorProfile } from '../mentor-profiles/entities/mentor-profile.entity';
import { MentorStatus } from '../mentor-profiles/enums/mentor.enum';

@Injectable()
export class StatsService {
  constructor(private readonly dataSource: DataSource) {}

  async findUserStats(user: User): Promise<IUSerStats> {
    const [totalVentures, referralsCount] = await Promise.all([
      this.#countUserVentures(user.id),
      this.#countUserReferrals(user.id)
    ]);
    return { totalVentures, referralsCount };
  }

  async findAdminStats(): Promise<IAdminStats> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const [
      totalUsers,
      usersByRole,
      venturesStats,
      projectsStats,
      eventsStats,
      programsStats,
      subprogramsStats,
      articlesStats,
      totalComments,
      mentorsStats
    ] = await Promise.all([
      this.#countTotalUsers(),
      this.#countUsersByRole(),
      this.#getVenturesStats(),
      this.#getProjectsStats(),
      this.#getEventsStats(),
      this.#getProgramsStats(),
      this.#getSubprogramsStats(),
      this.#getArticlesStats(),
      this.#countTotalComments(),
      this.#getMentorsStats()
    ]);

    return {
      users: {
        total: totalUsers,
        byRole: usersByRole
      },
      content: {
        ventures: venturesStats,
        projects: projectsStats,
        events: eventsStats,
        programs: programsStats,
        subprograms: subprogramsStats,
        articles: articlesStats
      },
      engagement: {
        comments: totalComments
      },
      mentors: mentorsStats
    };
  }

  async #countUserVentures(userId: string): Promise<number> {
    return await this.dataSource.getRepository(Venture).count({
      where: { owner: { id: userId } }
    });
  }

  async #countUserReferrals(userId: string): Promise<number> {
    return await this.dataSource.getRepository(User).count({
      where: { referred_by: { id: userId } }
    });
  }

  async #countTotalUsers(): Promise<number> {
    return await this.dataSource.getRepository(User).count();
  }

  async #countUsersByRole(): Promise<{ user: number; mentor: number; staff: number; admin: number }> {
    const userRole = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .innerJoin('user.roles', 'role')
      .where('role.name = :roleName', { roleName: 'user' })
      .getCount();

    const mentorRole = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .innerJoin('user.roles', 'role')
      .where('role.name = :roleName', { roleName: 'mentor' })
      .getCount();

    const staffRole = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .innerJoin('user.roles', 'role')
      .where('role.name = :roleName', { roleName: 'staff' })
      .getCount();

    const adminRole = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .innerJoin('user.roles', 'role')
      .where('role.name = :roleName', { roleName: 'admin' })
      .getCount();

    return { user: userRole, mentor: mentorRole, staff: staffRole, admin: adminRole };
  }

  async #getVenturesStats(): Promise<{ total: number; published: number; unpublished: number }> {
    const [total, published] = await Promise.all([
      this.dataSource.getRepository(Venture).count(),
      this.dataSource.getRepository(Venture).count({ where: { is_published: true } })
    ]);
    return { total, published, unpublished: total - published };
  }

  async #getProjectsStats(): Promise<{ total: number; published: number; unpublished: number }> {
    const [total, published] = await Promise.all([
      this.dataSource.getRepository(Project).count(),
      this.dataSource.getRepository(Project).count({ where: { is_published: true } }),
      this.dataSource.getRepository(Project).createQueryBuilder('project').getCount()
    ]);
    return { total, published, unpublished: total - published };
  }

  async #getEventsStats(): Promise<{ total: number; published: number; unpublished: number }> {
    const [total, published] = await Promise.all([
      this.dataSource.getRepository(Event).count(),
      this.dataSource.getRepository(Event).count({ where: { is_published: true } }),
      this.dataSource.getRepository(Event).createQueryBuilder('event').getCount()
    ]);
    return { total, published, unpublished: total - published };
  }

  async #getProgramsStats(): Promise<{ total: number; published: number; unpublished: number }> {
    const [total, published] = await Promise.all([
      this.dataSource.getRepository(Program).count(),
      this.dataSource.getRepository(Program).count({ where: { is_published: true } })
    ]);
    return { total, published, unpublished: total - published };
  }

  async #getSubprogramsStats(): Promise<{ total: number; published: number; unpublished: number }> {
    const [total, published] = await Promise.all([
      this.dataSource.getRepository(Subprogram).count(),
      this.dataSource.getRepository(Subprogram).count({ where: { is_published: true } })
    ]);
    return { total, published, unpublished: total - published };
  }

  async #getArticlesStats(): Promise<{
    total: number;
    published: number;
    unpublished: number;
  }> {
    const [total, published] = await Promise.all([
      this.dataSource.getRepository(Article).count(),
      this.dataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .where('article.published_at IS NOT NULL')
        .andWhere('article.published_at <= :now', { now: new Date() })
        .getCount()
    ]);
    return { total, published, unpublished: total - published };
  }

  async #countTotalComments(): Promise<number> {
    return await this.dataSource.getRepository(Comment).count();
  }

  async #getMentorsStats(): Promise<{ total: number; pending: number; approved: number; rejected: number }> {
    const [total, pending, approved, rejected] = await Promise.all([
      this.dataSource.getRepository(MentorProfile).count(),
      this.dataSource.getRepository(MentorProfile).count({ where: { status: MentorStatus.PENDING } }),
      this.dataSource.getRepository(MentorProfile).count({ where: { status: MentorStatus.APPROVED } }),
      this.dataSource.getRepository(MentorProfile).count({ where: { status: MentorStatus.REJECTED } })
    ]);
    return { total, pending, approved, rejected };
  }
}
