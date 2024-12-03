import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../users/entities/role.entity';

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource) {
    /**
     * Truncate tables
     */
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE TABLE user;');
    await dataSource.query('TRUNCATE TABLE role;');
    await dataSource.query('TRUNCATE TABLE user_roles;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');

    /**
     * Get repositories
     */
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    ['admin', 'user', 'staff', 'coach'].map(async (role) => {
      await roleRepository.save({ name: role });
    });

    await userRepository.save({
      name: faker.person.firstName(),
      address: faker.location.streetAddress(),
      phone_number: faker.phone.number({ style: 'human' }),
      email: 'admin@admin.com',
      verified_at: faker.date.recent(),
      password: await bcrypt.hash('admin1234', 10),
      roles: [await roleRepository.findOneByOrFail({ name: 'admin' })]
    });
  }
}
