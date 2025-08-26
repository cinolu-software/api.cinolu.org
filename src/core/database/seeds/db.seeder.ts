import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User } from '../../users/entities/user.entity';
import { Role } from 'src/core/users/roles/entities/role.entity';

export default class DbSeeder implements Seeder {
  async run(dataSource: DataSource) {
    await dataSource.dropDatabase();
    await dataSource.synchronize();

    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    const seed = async () => {
      const roleData = [
        { name: 'admin', label: 'Administrator' },
        { name: 'user', label: 'User' },
        { name: 'staff', label: 'Staff' },
        { name: 'coach', label: 'Coach' }
      ];
      const roles = await roleRepository.save(roleData.map((r) => roleRepository.create(r)));
      const findRole = (name: string) => roles.find((r) => r.name === name);

      // 2. Create Admin User
      await userRepository.save({
        name: 'Admin User',
        city: faker.location.city(),
        country: faker.location.country(),
        biography: faker.lorem.paragraph(),
        reason: faker.lorem.sentence(),
        gender: faker.person.sex(),
        birth_date: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
        phone_number: faker.phone.number({ style: 'human' }),
        email: 'admin@admin.com',
        password: await bcrypt.hash('admin1234', 10),
        roles: [findRole('admin')]
      });
    };
    await seed();
  }
}
