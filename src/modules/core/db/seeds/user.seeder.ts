import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/core/users/entities/user.entity';
import { Role } from 'src/modules/core/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { fakerFR as faker } from '@faker-js/faker';

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource) {
    /**
     * Truncate tables
     */
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE TABLE user;');
    await dataSource.query('TRUNCATE TABLE role;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');

    /**
     * Get repositories
     */
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    /**
     * Save roles
     */
    ['admin', 'user', 'staff', 'coach'].map(async (role) => {
      await roleRepository.save({ name: role });
    });

    /**
     * Create random users
     * @param count
     * @param roleName
     * @param password
     */
    const createUsers = async (count: number, roleName: string, password: string) => {
      await Promise.all(
        Array(count)
          .fill('')
          .map(async () => {
            await userRepository.save({
              name: faker.person.fullName(),
              address: faker.location.streetAddress(),
              phone_number: faker.phone.number(),
              email: faker.internet.email(),
              verified_at: new Date(),
              google_image: faker.image.avatar(),
              password: await bcrypt.hash(password, 10),
              roles: [await roleRepository.findOneByOrFail({ name: roleName })]
            });
          })
      );
    };

    await createUsers(10, 'staff', 'staff1234');

    await userRepository.save({
      name: faker.person.firstName(),
      address: faker.location.streetAddress(),
      phone_number: '+243999999999',
      email: 'admin@admin.com',
      verified_at: faker.date.recent(),
      password: await bcrypt.hash('admin1234', 10),
      google_image: faker.image.avatar(),
      roles: [await roleRepository.findOneBy({ name: 'admin' })]
    });

    await createUsers(20, 'coach', 'coach1234');
  }
}
