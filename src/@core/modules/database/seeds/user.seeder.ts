import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { Detail } from '../../users/users/entities/detail.entity';
import { Social } from '../../users/users/entities/social.entity';
import { User } from '../../users/users/entities/user.entity';
import { Expertise } from '../../users/expertises/entities/expertise.entity';
import { Position } from '../../users/positions/entities/position.entity';
import { Role } from '../../users/roles/entities/role.entity';

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource) {
    /**
     * Truncate tables
     */
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE TABLE user;');
    await dataSource.query('TRUNCATE TABLE role;');
    await dataSource.query('TRUNCATE TABLE detail;');
    await dataSource.query('TRUNCATE TABLE expertise;');
    await dataSource.query('TRUNCATE TABLE social;');
    await dataSource.query('TRUNCATE TABLE position;');
    await dataSource.query('TRUNCATE TABLE user_roles;');
    await dataSource.query('TRUNCATE TABLE detail_expertises;');
    await dataSource.query('TRUNCATE TABLE detail_positions;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');

    /**
     * Get repositories
     */
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);
    const detailRepository = dataSource.getRepository(Detail);
    const expertiseRepository = dataSource.getRepository(Expertise);
    const positionRepository = dataSource.getRepository(Position);
    const socialRepository = dataSource.getRepository(Social);

    ['admin', 'user', 'staff', 'coach'].map(async (role) => {
      await roleRepository.save({ name: role });
    });

    const createExpertises = async (count: number): Promise<Expertise[]> => {
      return await Promise.all(
        Array(count)
          .fill('')
          .map(async () => {
            return await expertiseRepository.save({
              name: faker.person.jobTitle(),
              description: faker.person.jobDescriptor()
            });
          })
      );
    };

    const createPositions = async (count: number) => {
      return await Promise.all(
        Array(count)
          .fill('')
          .map(async () => {
            return await positionRepository.save({
              name: faker.person.jobType(),
              description: faker.person.jobDescriptor()
            });
          })
      );
    };

    const createSocials = async (socials = ['Instagram', 'LinkdedIn', 'Twitter']) => {
      return await Promise.all(
        socials.map(async (social) => {
          return await socialRepository.save({
            name: social,
            link: faker.internet.url()
          });
        })
      );
    };

    const createDetail = async () => {
      const positions: Position[] = await createPositions(faker.number.int({ min: 1, max: 2 }));
      const expertises: Expertise[] = await createExpertises(faker.number.int({ min: 1, max: 2 }));
      const socials: Social[] = await createSocials();
      return await detailRepository.save({
        bio: faker.person.bio(),
        socials,
        expertises,
        positions
      });
    };

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
              password: await bcrypt.hash(password, 10),
              detail: await createDetail(),
              roles: [await roleRepository.findOneByOrFail({ name: roleName })]
            });
          })
      );
    };

    await createUsers(10, 'staff', 'staff1234');
    await createUsers(20, 'coach', 'coach1234');
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
