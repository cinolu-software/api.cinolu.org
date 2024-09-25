import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class Seed1727254368749 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('admin', 10);
    queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into('role')
      .values([{ name: 'user' }, { name: 'admin' }, { name: 'staff' }, { name: 'coach' }])
      .into('user')
      .values({
        email: 'admin@admin.com',
        name: 'Admin',
        password,
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
