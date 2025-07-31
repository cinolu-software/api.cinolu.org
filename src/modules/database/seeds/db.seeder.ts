import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User } from '../../users/entities/user.entity';
import slugify from 'slugify';
import { Program } from 'src/modules/programs/entities/program.entity';
import { EventCategory } from 'src/modules/programs/events/categories/entities/category.entity';
import { ProjectCategory } from 'src/modules/programs/projects/categories/entities/category.entity';
import { Project } from 'src/modules/programs/projects/entities/project.entity';
import { Event } from 'src/modules/programs/events/entities/event.entity';
import { Venture } from 'src/modules/ventures/entities/venture.entity';
import { Role } from 'src/modules/users/roles/entities/role.entity';

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
    const ventureRepository = dataSource.getRepository(Venture);

    const seed = async () => {
      // Track used names
      const usedUserNames = new Set<string>();
      const usedVentureNames = new Set<string>();

      // Helper to generate unique names
      const generateUniqueName = (usedNames: Set<string>, generatorFn: () => string): string => {
        let name: string;
        let attempts = 0;

        do {
          name = generatorFn();
          attempts++;
        } while (usedNames.has(name) && attempts < 10);

        usedNames.add(name);
        return name;
      };

      // 1. Roles
      const roleData = [
        { name: 'admin', label: 'Administrator' },
        { name: 'user', label: 'User' },
        { name: 'staff', label: 'Staff' },
        { name: 'coach', label: 'Coach' }
      ];
      const roles = await roleRepository.save(roleData.map((r) => roleRepository.create(r)));
      const findRole = (name: string) => roles.find((r) => r.name === name);

      // 2. Create Admin User
      const admin = await userRepository.save({
        name: generateUniqueName(usedUserNames, () => faker.person.fullName()),
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

      // 3. Bulk User Creation
      const createUsers = async (count: number, roleName: string): Promise<User[]> => {
        const role = findRole(roleName);
        const users = Array.from({ length: count }).map(() =>
          userRepository.create({
            name: generateUniqueName(usedUserNames, () => faker.person.firstName()),
            city: faker.location.city(),
            country: faker.location.country(),
            biography: faker.lorem.paragraph(),
            reason: faker.lorem.sentence(),
            gender: faker.person.sex(),
            birth_date: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
            phone_number: faker.phone.number({ style: 'human' }),
            email: faker.internet.email(),
            password: bcrypt.hashSync('password1234', 10),
            roles: [role]
          })
        );
        return userRepository.save(users);
      };

      await createUsers(8, 'admin');
      const users = await createUsers(1000, 'user');
      await createUsers(10, 'staff');
      await createUsers(50, 'coach');

      // 4. Categories
      const eventCategories = await eventCategoryRepository.save(
        Array.from({ length: 10 }).map(() => eventCategoryRepository.create({ name: faker.commerce.department() }))
      );

      const projectCategories = await projectCategoryRepository.save(
        Array.from({ length: 10 }).map(() => projectCategoryRepository.create({ name: faker.commerce.department() }))
      );

      // 5. Create Projects
      const createProjects = (count: number) => {
        return Array.from({ length: count }).map(() => {
          const name = `${faker.commerce.productName()} - ${faker.number.int({ min: 1, max: 1000 })}`;
          return projectRepository.create({
            name,
            description: faker.lorem.paragraphs(2),
            is_published: true,
            slug: slugify(name, { lower: true }),
            started_at: faker.helpers.arrayElement([faker.date.past(), faker.date.recent()]),
            ended_at: faker.date.future(),
            form_link: faker.internet.url(),
            categories: faker.helpers.arrayElements(projectCategories, { min: 2, max: 4 })
          });
        });
      };

      // 6. Create Events
      const createEvents = (count: number) => {
        return Array.from({ length: count }).map(() => {
          const name = `${faker.commerce.productName()} - ${faker.number.int({ min: 1, max: 1000 })}`;
          return eventRepository.create({
            name,
            description: faker.lorem.paragraphs(2),
            slug: slugify(name, { lower: true }),
            place: faker.location.city(),
            started_at: faker.helpers.arrayElement([faker.date.past(), faker.date.recent()]),
            ended_at: faker.date.future(),
            is_published: true,
            form_link: faker.internet.url(),
            categories: faker.helpers.arrayElements(eventCategories, { min: 2, max: 4 })
          });
        });
      };

      // 7. Create Programs
      const createPrograms = async (count: number): Promise<Program[]> => {
        const programs: Program[] = [];
        for (let i = 0; i < count; i++) {
          const events = createEvents(faker.number.int({ min: 3, max: 5 }));
          const projects = createProjects(faker.number.int({ min: 3, max: 6 }));
          const savedEvents = await eventRepository.save(events);
          const savedProjects = await projectRepository.save(projects);
          const program = programRepository.create({
            name: faker.commerce.department(),
            description: faker.lorem.paragraphs(2),
            events: savedEvents,
            projects: savedProjects
          });
          programs.push(program);
        }
        return programRepository.save(programs);
      };
      await createPrograms(60);

      // 8. Create Ventures for Users
      const createVentures = async (owners: User[]) => {
        const ventures: Venture[] = [];

        for (const owner of owners) {
          for (let i = 0; i < 30; i++) {
            const name = generateUniqueName(
              usedVentureNames,
              () => `${faker.commerce.productName()} - ${faker.number.int({ min: 1, max: 1000 })}`
            );

            ventures.push(
              ventureRepository.create({
                name,
                slug: slugify(name, { lower: true }),
                description: faker.lorem.paragraphs(2),
                problem_solved: faker.lorem.sentence(),
                target_market: faker.lorem.sentence(),
                email: faker.internet.email(),
                phone_number: faker.phone.number({ style: 'human' }),
                website: faker.internet.url(),
                linkedin_url: faker.internet.url(),
                sector: faker.commerce.department(),
                is_published: faker.datatype.boolean(),
                founded_at: faker.date.past(),
                location: faker.location.city(),
                stage: faker.commerce.department(),
                owner
              })
            );
          }
        }

        await ventureRepository.save(ventures);
      };
      await createVentures([...users, admin]);
    };
    await seed();
  }
}
