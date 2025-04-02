import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../users/roles/entities/role.entity';
import { Program } from 'src/programs/entities/program.entity';
import { Project } from 'src/programs/projects/entities/project.entity';
import { Category as ProjectCategory } from 'src/programs/projects/categories/entities/category.entity';
import { Event } from 'src/programs/events/entities/event.entity';
import { Category as EventCategory } from 'src/programs/events/categories/entities/category.entity';
import { Post } from 'src/blog/posts/entities/post.entity';
import { Comment } from 'src/blog/comments/entities/comment.entity';
import { Category as PostCategory } from 'src/blog/categories/entities/category.entity';
import { Expertise } from 'src/users/expertises/entities/expertise.entity';
import { Position } from 'src/users/positions/entities/position.entity';
import { Member } from 'src/ecosystem/members/entities/member.entity';
import { Category as MemberCategory } from 'src/ecosystem/categories/entities/category.entity';
import slugify from 'slugify';
import { Phase } from 'src/programs/projects/phases/entities/phase.entity';

export default class DbSeeder implements Seeder {
  async run(dataSource: DataSource) {
    await dataSource.dropDatabase();
    await dataSource.synchronize();

    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);
    const programRepository = dataSource.getRepository(Program);
    const projectRepository = dataSource.getRepository(Project);
    const eventRepository = dataSource.getRepository(Event);
    const projectCategoryRepository = dataSource.getRepository(ProjectCategory);
    const eventCategoryRepository = dataSource.getRepository(EventCategory);
    const postRepository = dataSource.getRepository(Post);
    const commentRepository = dataSource.getRepository(Comment);
    const postCategoryRepository = dataSource.getRepository(PostCategory);
    const expertisesRepository = dataSource.getRepository(Expertise);
    const positionRepository = dataSource.getRepository(Position);
    const memberRepository = dataSource.getRepository(Member);
    const memberCategoryRepository = dataSource.getRepository(MemberCategory);
    const phaseRepository = dataSource.getRepository(Phase);

    const createPrograms = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await programRepository.save({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            projects: await createProjects(faker.number.int({ min: 3, max: 10 })),
            events: await createEvents(faker.number.int({ min: 3, max: 10 }))
          });
        })
      );
    };

    const createPosts = async (count: number, users: User[]) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          const title = faker.commerce.productName();
          const slug = slugify(title, { lower: true });
          return await postRepository.save({
            title,
            slug,
            content: faker.commerce.productDescription(),
            categories: await createPostCategories(faker.number.int({ min: 1, max: 5 })),
            comments: await createComments(faker.number.int({ min: 20, max: 30 }), users),
            author: faker.helpers.arrayElement(users)
          });
        })
      );
    };

    const createMembers = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await memberRepository.save({
            name: faker.company.name(),
            website: faker.internet.url(),
            description: faker.commerce.productDescription(),
            categories: await createMemberCategory(faker.number.int({ min: 1, max: 5 }))
          });
        })
      );
    };

    const createComments = async (count: number, users: User[]) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await commentRepository.save({
            content: faker.commerce.productDescription(),
            by: faker.helpers.arrayElement(users)
          });
        })
      );
    };

    const createPhases = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await phaseRepository.save({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            started_at: faker.date.past(),
            ended_at: faker.date.future(),
            requirements: generateRequirements() as unknown as JSON
          });
        })
      );
    };

    const createProjects = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async (_: unknown, i: number) => {
          const name = `${faker.commerce.productName()} ${i}`;
          const slug = slugify(name, { lower: true });
          return await projectRepository.save({
            name,
            slug,
            description: faker.commerce.productDescription(),
            started_at: faker.date.past(),
            ended_at: faker.date.future(),
            is_published: faker.helpers.arrayElement([true, false]),
            requirements: generateRequirements() as unknown as JSON,
            categories: await createProjectCategories(faker.number.int({ min: 1, max: 5 })),
            phases: await createPhases(faker.number.int({ min: 1, max: 5 })),
            form: generateJSONForm(faker.number.int({ min: 1, max: 5 })) as unknown as JSON
          });
        })
      );
    };

    const generateRequirements = () => {
      return Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => {
        return {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription()
        };
      });
    };

    const createEvents = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async (_: unknown, i: number) => {
          const name = `${faker.commerce.productName()} ${i}`;
          const slug = slugify(name, { lower: true });
          return await eventRepository.save({
            name,
            slug,
            description: faker.commerce.productDescription(),
            started_at: faker.date.past(),
            ended_at: faker.date.future(),
            is_published: faker.helpers.arrayElement([true, false]),
            place: faker.location.city(),
            categories: await createEventCategories(faker.number.int({ min: 1, max: 5 })),
            link: faker.helpers.arrayElement([faker.internet.url(), null])
          });
        })
      );
    };

    const createUsers = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await userRepository.save({
            name: faker.person.firstName(),
            address: faker.location.streetAddress(),
            phone_number: faker.phone.number({ style: 'human' }),
            email: faker.internet.email(),
            password: await bcrypt.hash('password', 10),
            biography: faker.person.jobDescriptor(),
            roles: [await roleRepository.findOneByOrFail({ name: 'user' })]
          });
        })
      );
    };

    const createStaffs = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await userRepository.save({
            name: faker.person.firstName(),
            address: faker.location.streetAddress(),
            phone_number: faker.phone.number({ style: 'human' }),
            email: faker.internet.email(),
            password: await bcrypt.hash('password', 10),
            biography: faker.person.jobDescriptor(),
            positions: await createPositions(faker.number.int({ min: 1, max: 2 })),
            roles: [await roleRepository.findOneByOrFail({ name: 'staff' })]
          });
        })
      );
    };

    const createCoaches = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await userRepository.save({
            name: faker.person.firstName(),
            address: faker.location.streetAddress(),
            phone_number: faker.phone.number({ style: 'human' }),
            email: faker.internet.email(),
            password: await bcrypt.hash('password', 10),
            biography: faker.person.jobDescriptor(),
            expertises: await createExpertises(faker.number.int({ min: 1, max: 5 })),
            roles: [await roleRepository.findOneByOrFail({ name: 'coach' })]
          });
        })
      );
    };

    const createExpertises = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await expertisesRepository.save({
            name: faker.person.jobArea()
          });
        })
      );
    };

    const createPositions = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await positionRepository.save({
            name: faker.person.jobTitle()
          });
        })
      );
    };

    const createProjectCategories = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await projectCategoryRepository.save({
            name: faker.commerce.productName()
          });
        })
      );
    };

    const createPostCategories = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await postCategoryRepository.save({
            name: faker.commerce.productName()
          });
        })
      );
    };

    const createMemberCategory = async (count: number) => {
      const categories = [
        'Startups',
        'SAEI & ESOs',
        'Corporates',
        'Investors',
        'Public Sector',
        'Academia',
        'Media',
        'Associations',
        'Others'
      ];
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await memberCategoryRepository.save({
            name: faker.helpers.arrayElement(categories)
          });
        })
      );
    };

    const createEventCategories = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await eventCategoryRepository.save({
            name: faker.commerce.productName()
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

    const generateJSONForm = (count: number) => {
      const form = [];
      const types = ['text', 'number', 'email', 'textarea', 'select'];
      Array.from({ length: count }, () => {
        const type = faker.helpers.arrayElement(types);
        form.push({
          type,
          name: faker.lorem.word(),
          label: faker.lorem.sentence(),
          placeholder: faker.lorem.sentence(),
          required: faker.helpers.arrayElement([true, false]),
          options:
            type === 'select'
              ? Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.lorem.word())
              : null
        });
      });
      return form;
    };

    await createPrograms(10);
    await createUsers(100);
    const staffs = await createStaffs(10);
    await createCoaches(20);
    await createPosts(200, staffs);
    await createMembers(40);
  }
}
