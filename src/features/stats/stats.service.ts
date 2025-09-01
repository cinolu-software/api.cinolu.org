import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

export interface IAdminStats {
  totalUsers: number;
  totalUsersPerRoles: { role: string; count: number }[];
  totalPublishedPrograms: number;
  totalUnpublishedPrograms: number;
  totalPublishedSubprograms: number;
  totalUnpublishedSubprograms: number;
  totalPublishedProjects: number;
  totalUnpublishedProjects: number;
  totalPublishedEvents: number;
  totalUnpublishedEvents: number;
  totalArticles: number;
}

@Injectable()
export class StatsService {
  constructor(private dataSource: DataSource) {}

  async findAdminStats(): Promise<IAdminStats> {
    const queryRunner = this.dataSource.createQueryRunner();

    const [
      totalUsers,
      totalUsersPerRoles,
      totalPublishedPrograms,
      totalUnpublishedPrograms,
      totalPublishedSubprograms,
      totalUnpublishedSubprograms,
      totalPublishedProjects,
      totalUnpublishedProjects,
      totalPublishedEvents,
      totalUnpublishedEvents,
      totalArticles
    ] = await Promise.all([
      queryRunner.query(`SELECT CAST(COUNT(*) AS UNSIGNED) AS count FROM \`user\``),

      queryRunner.query(
        `
          SELECT r.label AS role, CAST(COUNT(ur.userId) AS UNSIGNED) AS count
          FROM role r
                 LEFT JOIN user_roles_role ur ON r.id = ur.roleId
          GROUP BY r.id, r.name
          ORDER BY r.name
        `
      ),

      queryRunner.query(`SELECT CAST(COUNT(*) AS UNSIGNED) AS count FROM program WHERE is_published = true`),
      queryRunner.query(`SELECT CAST(COUNT(*) AS UNSIGNED) AS count FROM program WHERE is_published = false`),
      queryRunner.query(`SELECT CAST(COUNT(*) AS UNSIGNED) AS count FROM subprogram WHERE is_published = true`),
      queryRunner.query(`SELECT CAST(COUNT(*) AS UNSIGNED) AS count FROM subprogram WHERE is_published = false`),
      queryRunner.query(`SELECT CAST(COUNT(*) AS UNSIGNED) AS count FROM project WHERE is_published = true`),
      queryRunner.query(`SELECT CAST(COUNT(*) AS UNSIGNED) AS count FROM project WHERE is_published = false`),
      queryRunner.query(`SELECT CAST(COUNT(*) AS UNSIGNED) AS count FROM event WHERE is_published = true`),
      queryRunner.query(`SELECT CAST(COUNT(*) AS UNSIGNED) AS count FROM event WHERE is_published = false`),
      queryRunner.query(`SELECT CAST(COUNT(*) AS UNSIGNED) AS count FROM article`)
    ]);

    return {
      totalUsers: totalUsers[0].count,
      totalUsersPerRoles: totalUsersPerRoles.map((row: { role: string; count: number }) => ({
        role: row.role,
        count: row.count
      })),
      totalPublishedPrograms: totalPublishedPrograms[0].count,
      totalUnpublishedPrograms: totalUnpublishedPrograms[0].count,
      totalPublishedSubprograms: totalPublishedSubprograms[0].count,
      totalUnpublishedSubprograms: totalUnpublishedSubprograms[0].count,
      totalPublishedProjects: totalPublishedProjects[0].count,
      totalUnpublishedProjects: totalUnpublishedProjects[0].count,
      totalPublishedEvents: totalPublishedEvents[0].count,
      totalUnpublishedEvents: totalUnpublishedEvents[0].count,
      totalArticles: totalArticles[0].count
    };
  }
}
