import { Role } from 'src/app/modules/roles/entities/role.entity';
import { User } from 'src/app/modules/users/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1722416024007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.getRepository(Role).create([
        { name: 'admin', created_at: new Date(), updated_at: new Date() },
        { name: 'user', created_at: new Date(), updated_at: new Date() }
      ])
    );

    await queryRunner.manager.save(
      queryRunner.manager.getRepository(User).create([
        {
          email: 'admin@admin.com',
          first_name: 'Administateur',
          name: 'Admin',
          last_name: 'Admin',
          password: '$2a$10$t.2p8hUuM5FMFK0xxGVcD.Bi5NqkuENf5Yf4aOFk4Pc5.jpOScJZu',
          created_at: new Date(),
          updated_at: new Date(),
          phone_number: '+243079265726',
          address: '11, avenue des huileries, Kinshasa, Gombe',
          verified_at: new Date(),
          roles: [{ id: 1 }]
        }
      ])
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE * FROM role');
    await queryRunner.query('DELETE * FROM user');
  }
}
