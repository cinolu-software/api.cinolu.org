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
import { Category as MemberCategory } from 'src/organizations/categories/entities/category.entity';
import slugify from 'slugify';
import { Phase } from 'src/programs/projects/phases/entities/phase.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Like } from 'src/blog/posts/entities/like.entity';
import { View } from 'src/blog/posts/entities/view.entity';

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
    const organizationRepository = dataSource.getRepository(Organization);
    const organizationCategoryRepository = dataSource.getRepository(MemberCategory);
    const phaseRepository = dataSource.getRepository(Phase);
    const likeRepository = dataSource.getRepository(Like);
    const viewRepository = dataSource.getRepository(View);

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
          const categories = await postCategoryRepository.find();
          return await postRepository.save({
            title,
            slug,
            likes: await createLikes(faker.number.int({ min: 20, max: 30 }), users),
            views: await createViews(faker.number.int({ min: 20, max: 30 })),
            content: faker.lorem.paragraphs(faker.number.int({ min: 20, max: 60 })),
            categories: faker.helpers.arrayElements(categories, { min: 1, max: 3 }),
            comments: await createComments(faker.number.int({ min: 20, max: 30 }), users),
            author: faker.helpers.arrayElement(users)
          });
        })
      );
    };

    async function createViews(count: number) {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await viewRepository.save({
            ip: faker.internet.ipv4()
          });
        })
      );
    }

    const createLikes = async (count: number, users: User[]) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await likeRepository.save({
            user: faker.helpers.arrayElement(users)
          });
        })
      );
    };

    const createOrganizations = async (count: number) => {
      const categories = await organizationCategoryRepository.find();
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await organizationRepository.save({
            name: faker.company.name(),
            website: faker.internet.url(),
            is_approved: true,
            location: faker.location.city(),
            description: faker.commerce.productDescription(),
            categories: faker.helpers.arrayElements(categories, { min: 1, max: 3 })
          });
        })
      );
    };

    const createComments = async (count: number, users: User[]) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await commentRepository.save({
            content: faker.lorem.lines(faker.number.int({ min: 1, max: 3 })),
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
          const categories = await projectCategoryRepository.find();
          return await projectRepository.save({
            name,
            slug,
            description: faker.commerce.productDescription(),
            started_at: faker.date.past(),
            ended_at: faker.date.future(),
            is_published: faker.helpers.arrayElement([true, false]),
            requirements: generateRequirements() as unknown as JSON,
            categories: faker.helpers.arrayElements(categories, { min: 1, max: 3 }),
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
          const categories = await eventCategoryRepository.find();
          return await eventRepository.save({
            name,
            slug,
            description: faker.commerce.productDescription(),
            started_at: faker.date.past(),
            ended_at: faker.date.future(),
            is_published: faker.helpers.arrayElement([true, false]),
            place: faker.location.city(),
            categories: faker.helpers.arrayElements(categories, { min: 1, max: 3 }),
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
            name: faker.person.jobTitle()
          });
        })
      );
    };

    const createPositions = async (count: number) => {
      return Promise.all(
        Array.from({ length: count }, async () => {
          return await positionRepository.save({
            name: faker.person.jobType()
          });
        })
      );
    };

    const createProjectCategories = async () => {
      return Promise.all(
        [
          'Startup Acceleration',
          'Entrepreneurship Training',
          'Digital Skills Development',
          'Women Empowerment',
          'Youth Innovation',
          'Green Tech & Sustainability',
          'Agritech Solutions',
          'Fintech & Digital Finance',
          'Creative Industries',
          'Social Impact Projects'
        ].map(
          async (category) =>
            await projectCategoryRepository.save({
              name: category
            })
        )
      );
    };

    const createPostCategories = async () => {
      return Promise.all(
        [
          'Entrepreneur Tips',
          'Startup Stories',
          'Tech Trends',
          'Funding & Investment',
          'Policy & Regulation',
          'Innovation Spotlight',
          'Market Insights',
          'Founder Interviews',
          'Productivity & Tools',
          'Learning Resources'
        ].map(
          async (category) =>
            await postCategoryRepository.save({
              name: category
            })
        )
      );
    };

    const createOrganizationCategory = async () => {
      return Promise.all(
        ['Startups', 'SAEI & ESOs', 'Corporates', 'Institutions', 'Partners'].map(
          async (category) => await organizationCategoryRepository.save({ name: category })
        )
      );
    };

    const createEventCategories = async () => {
      return Promise.all(
        [
          'Networking',
          'Workshops',
          'Conferences',
          'Webinars',
          'Pitch Competitions',
          'Mentorship Sessions',
          'Hackathons',
          'Fireside Chats',
          'Panel Discussions',
          'Roundtable Discussions'
        ].map(
          async (category) =>
            await eventCategoryRepository.save({
              name: category
            })
        )
      );
    };

    ['admin', 'user', 'staff', 'coach'].map(async (role) => {
      await roleRepository.save({ name: role });
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

    await createProjectCategories();
    await createPostCategories();
    await createEventCategories();
    await createOrganizationCategory();
    await createPrograms(10);
    const staffs = await createStaffs(10);
    await createCoaches(20);
    await createPosts(200, staffs);
    await createOrganizations(25);
    await createUsers(100);
    await userRepository.save({
      name: faker.person.firstName(),
      address: faker.location.streetAddress(),
      phone_number: faker.phone.number({ style: 'human' }),
      email: 'admin@admin.com',
      password: await bcrypt.hash('admin1234', 10),
      roles: [await roleRepository.findOneByOrFail({ name: 'admin' })]
    });
  }
}
