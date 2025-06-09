import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../users/roles/entities/role.entity';
import { Program } from 'src/programs/entities/program.entity';
import { Event } from 'src/programs/events/entities/event.entity';
import slugify from 'slugify';
import { Project } from 'src/programs/projects/entities/project.entity';
import { EventCategory } from 'src/programs/events/categories/entities/category.entity';
import { ProjectCategory } from 'src/programs/projects/categories/entities/category.entity';

export default class DbSeeder implements Seeder {
  async run(dataSource: DataSource) {
    await dataSource.dropDatabase();
    await dataSource.synchronize();

    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);
    const programRepository = dataSource.getRepository(Program);
    const eventRepository = dataSource.getRepository(Event);
    const projectRepository = dataSource.getRepository(Project);
    const eventCategoryRepository = dataSource.getRepository(EventCategory);
    const projectCategoryRepository = dataSource.getRepository(ProjectCategory);

    const createProgram = async (count: number): Promise<Program[]> => {
      return Promise.all(
        Array.from({ length: count }).map(async () => {
          return await programRepository.save({
            name: faker.commerce.department(),
            description: faker.lorem.paragraphs(2),
            events: await createEvents(faker.number.int({ min: 3, max: 5 })),
            projects: await createProject(faker.number.int({ min: 3, max: 6 }))
          });
        })
      );
    };

    const createEvents = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }).map(async () => {
          const name = `${faker.commerce.productName()} - ${faker.number.int({ min: 1, max: 1000 })}`;
          return await eventRepository.save({
            name,
            description: faker.lorem.paragraphs(2),
            date: faker.date.future(),
            slug: slugify(name, { lower: true }),
            place: faker.location.city(),
            started_at: faker.helpers.arrayElement([faker.date.past(), faker.date.recent()]),
            is_published: true,
            form_link: faker.internet.url(),
            ended_at: faker.date.future(),
            categories: await createEventCategories(faker.number.int({ min: 1, max: 3 }))
          });
        })
      );
    };

    const createProject = async (count: number): Promise<Project[]> => {
      return Promise.all(
        Array.from({ length: count }).map(async () => {
          const name = `${faker.commerce.productName()} - ${faker.number.int({ min: 1, max: 1000 })}`;
          return await projectRepository.save({
            name,
            description: faker.lorem.paragraphs(2),
            is_published: true,
            slug: slugify(name, { lower: true }),
            started_at: faker.helpers.arrayElement([faker.date.past(), faker.date.recent()]),
            ended_at: faker.date.future(),
            form_link: faker.internet.url(),
            categories: await createProductCategories(faker.number.int({ min: 1, max: 3 }))
          });
        })
      );
    };

    const createEventCategories = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }).map(async () => {
          return await eventCategoryRepository.save({
            name: faker.commerce.department()
          });
        })
      );
    };

    const createProductCategories = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }).map(async () => {
          return await projectCategoryRepository.save({
            name: faker.commerce.department()
          });
        })
      );
    };

    ['admin', 'user', 'staff', 'coach'].map(async (role) => {
      await roleRepository.save({ name: role });
    });

    await userRepository.save({
      name: faker.person.firstName(),
      address: faker.location.streetAddress(),
      phone_number: faker.phone.number({ style: 'human' }),
      email: 'admin@admin.com',
      password: await bcrypt.hash('admin1234', 10),
      roles: [await roleRepository.findOneByOrFail({ name: 'admin' })]
    });

    await createProgram(60);
  }
}
