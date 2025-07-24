import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User } from '../../users/entities/user.entity';
import { Role } from 'src/users/roles/entities/role.entity';

/*
import slugify from 'slugify';
import { Program } from 'src/programs/entities/program.entity';
import { EventCategory } from 'src/programs/events/categories/entities/category.entity';
import { ProjectCategory } from 'src/programs/projects/categories/entities/category.entity';
import { Project } from 'src/programs/projects/entities/project.entity';
import { Event } from 'src/programs/events/entities/event.entity';
*/
export default class DbSeeder implements Seeder {
  async run(dataSource: DataSource) {
    await dataSource.dropDatabase();
    await dataSource.synchronize();

    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);
    /*
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
      const categories = await eventCategoryRepository.find();
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
            categories: faker.helpers.arrayElements(categories, { min: 2, max: 4 })
          });
        })
      );
    };

    const createProject = async (count: number): Promise<Project[]> => {
      const categories = await projectCategoryRepository.find();
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
            categories: faker.helpers.arrayElements(categories, { min: 2, max: 4 })
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
    */

    ['admin', 'user', 'staff', 'coach'].map(async (role) => {
      await roleRepository.save({ name: role });
    });

    /*
    const createUsers = async (count: number, roleName: string): Promise<User[]> => {
      const role = await roleRepository.findOneByOrFail({ name: roleName });
      return Promise.all(
        Array.from({ length: count }).map(async () => {
          return await userRepository.save({
            name: faker.person.firstName(),
            address: faker.location.streetAddress(),
            phone_number: faker.phone.number({ style: 'human' }),
            email: faker.internet.email(),
            password: await bcrypt.hash('password1234', 10),
            roles: [role]
          });
        })
      );
    };
    */

    await userRepository.save({
      name: faker.person.firstName(),
      address: faker.location.streetAddress(),
      phone_number: faker.phone.number({ style: 'human' }),
      email: 'admin@admin.com',
      password: await bcrypt.hash('admin1234', 10),
      roles: [await roleRepository.findOneByOrFail({ name: 'admin' })]
    });
    /*
    await createUsers(8, 'admin');
    await createUsers(1000, 'user');
    await createUsers(10, 'staff');
    await createUsers(50, 'coach');
    await createProductCategories(10);
    await createEventCategories(10);
    await createProgram(60);
    */
  }
}
