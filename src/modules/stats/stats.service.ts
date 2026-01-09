import { Injectable } from '@nestjs/common';
import { DataSource, MoreThan } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Venture } from '../ventures/core/entities/venture.entity';
import { IUSerStats } from './types/user-stats.type';
import { IAdminStats } from './types/admin-stats.type';
import { Project } from '../projects/entities/project.entity';
import { Event } from '../events/entities/event.entity';
import { Program } from '../programs/entities/program.entity';
import { Subprogram } from '../subprograms/entities/subprogram.entity';
import { Article } from '../blog/articles/entities/article.entity';
import { Product } from '../ventures/products/core/entities/product.entity';
import { Comment } from '../blog/comments/entities/comment.entity';
import { Submission } from '../projects/phases/submissions/entities/submission.entity';
import { Gallery } from '../galleries/entities/gallery.entity';
import { Tag } from '../blog/tags/entities/tag.entity';
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
      activeUsers,
      newUsersLast7Days,
      newUsersLast30Days,
      usersWithReferrals,
      venturesStats,
      projectsStats,
      eventsStats,
      programsStats,
      subprogramsStats,
      articlesStats,
      totalProducts,
      totalComments,
      totalSubmissions,
      totalGalleries,
      totalTags,
      mentorsStats,
      recentActivity
    ] = await Promise.all([
      this.#countTotalUsers(),
      this.#countUsersByRole(),
      this.#countActiveUsers(),
      this.#countNewUsers(sevenDaysAgo),
      this.#countNewUsers(thirtyDaysAgo),
      this.#countUsersWithReferrals(),
      this.#getVenturesStats(),
      this.#getProjectsStats(),
      this.#getEventsStats(),
      this.#getProgramsStats(),
      this.#getSubprogramsStats(),
      this.#getArticlesStats(),
      this.#countTotalProducts(),
      this.#countTotalComments(),
      this.#countTotalSubmissions(),
      this.#countTotalGalleries(),
      this.#countTotalTags(),
      this.#getMentorsStats(),
      this.#getRecentActivity(sevenDaysAgo)
    ]);

    return {
      users: {
        total: totalUsers,
        byRole: usersByRole,
        active: activeUsers,
        newLast7Days: newUsersLast7Days,
        newLast30Days: newUsersLast30Days,
        withReferrals: usersWithReferrals
      },
      content: {
        ventures: venturesStats,
        projects: projectsStats,
        events: eventsStats,
        programs: programsStats,
        subprograms: subprogramsStats,
        articles: articlesStats,
        products: {
          total: totalProducts
        }
      },
      engagement: {
        comments: totalComments,
        submissions: totalSubmissions,
        galleries: totalGalleries,
        tags: totalTags
      },
      mentors: mentorsStats,
      recentActivity
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

  async #countActiveUsers(): Promise<number> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return await this.dataSource.getRepository(User).count({
      where: { updated_at: MoreThan(thirtyDaysAgo) }
    });
  }

  async #countNewUsers(date: Date): Promise<number> {
    return await this.dataSource.getRepository(User).count({
      where: { created_at: MoreThan(date) }
    });
  }

  async #countUsersWithReferrals(): Promise<number> {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.referred_by IS NOT NULL')
      .getCount();
  }

  async #getVenturesStats(): Promise<{ total: number; published: number; unpublished: number }> {
    const [total, published] = await Promise.all([
      this.dataSource.getRepository(Venture).count(),
      this.dataSource.getRepository(Venture).count({ where: { is_published: true } })
    ]);
    return { total, published, unpublished: total - published };
  }

  async #getProjectsStats(): Promise<{
    total: number;
    published: number;
    unpublished: number;
    withParticipants: number;
  }> {
    const [total, published, withParticipants] = await Promise.all([
      this.dataSource.getRepository(Project).count(),
      this.dataSource.getRepository(Project).count({ where: { is_published: true } }),
      this.dataSource
        .getRepository(Project)
        .createQueryBuilder('project')
        .innerJoin('project.participants', 'participant')
        .getCount()
    ]);
    return { total, published, unpublished: total - published, withParticipants };
  }

  async #getEventsStats(): Promise<{
    total: number;
    published: number;
    unpublished: number;
    withParticipants: number;
  }> {
    const [total, published, withParticipants] = await Promise.all([
      this.dataSource.getRepository(Event).count(),
      this.dataSource.getRepository(Event).count({ where: { is_published: true } }),
      this.dataSource
        .getRepository(Event)
        .createQueryBuilder('event')
        .innerJoin('event.participants', 'participant')
        .getCount()
    ]);
    return { total, published, unpublished: total - published, withParticipants };
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
    highlighted: number;
  }> {
    const [total, published, highlighted] = await Promise.all([
      this.dataSource.getRepository(Article).count(),
      this.dataSource
        .getRepository(Article)
        .createQueryBuilder('article')
        .where('article.published_at IS NOT NULL')
        .andWhere('article.published_at <= :now', { now: new Date() })
        .getCount(),
      this.dataSource.getRepository(Article).count({ where: { is_highlighted: true } })
    ]);
    return { total, published, unpublished: total - published, highlighted };
  }

  async #countTotalProducts(): Promise<number> {
    return await this.dataSource.getRepository(Product).count();
  }

  async #countTotalComments(): Promise<number> {
    return await this.dataSource.getRepository(Comment).count();
  }

  async #countTotalSubmissions(): Promise<number> {
    return await this.dataSource.getRepository(Submission).count();
  }

  async #countTotalGalleries(): Promise<number> {
    return await this.dataSource.getRepository(Gallery).count();
  }

  async #countTotalTags(): Promise<number> {
    return await this.dataSource.getRepository(Tag).count();
  }

  async #getMentorsStats(): Promise<{
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  }> {
    const [total, pending, approved, rejected] = await Promise.all([
      this.dataSource.getRepository(MentorProfile).count(),
      this.dataSource.getRepository(MentorProfile).count({ where: { status: MentorStatus.PENDING } }),
      this.dataSource.getRepository(MentorProfile).count({ where: { status: MentorStatus.APPROVED } }),
      this.dataSource.getRepository(MentorProfile).count({ where: { status: MentorStatus.REJECTED } })
    ]);
    return { total, pending, approved, rejected };
  }

  async #getRecentActivity(date: Date): Promise<{
    newUsersLast7Days: number;
    newVenturesLast7Days: number;
    newProjectsLast7Days: number;
    newEventsLast7Days: number;
    newArticlesLast7Days: number;
  }> {
    const [newUsers, newVentures, newProjects, newEvents, newArticles] = await Promise.all([
      this.dataSource.getRepository(User).count({ where: { created_at: MoreThan(date) } }),
      this.dataSource.getRepository(Venture).count({ where: { created_at: MoreThan(date) } }),
      this.dataSource.getRepository(Project).count({ where: { created_at: MoreThan(date) } }),
      this.dataSource.getRepository(Event).count({ where: { created_at: MoreThan(date) } }),
      this.dataSource.getRepository(Article).count({ where: { created_at: MoreThan(date) } })
    ]);
    return {
      newUsersLast7Days: newUsers,
      newVenturesLast7Days: newVentures,
      newProjectsLast7Days: newProjects,
      newEventsLast7Days: newEvents,
      newArticlesLast7Days: newArticles
    };
  }
}
