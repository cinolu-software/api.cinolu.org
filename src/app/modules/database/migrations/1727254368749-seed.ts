import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1727254368749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into('role')
      .values([{ name: 'user' }, { name: 'admin' }, { name: 'staff' }, { name: 'coach' }])
      .into('user')
      .values({
        email: 'admin@admin.com',
        name: 'Admin',
        password: '$2y$10$MaQ/F3H/EMIyPQ.cKmW2DOkg9jy1xQJBl8dbcFJgthbdxZ4.I8bpS',
        phone_number: '+243979265726',
        address: 'Lubumbashi, RDC',
        verified_at: new Date(),
        roles: [{ id: 2 }]
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.clearTable('role');
    queryRunner.clearTable('user');
  }
}
