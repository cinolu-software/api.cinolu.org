import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { fakerFR as faker } from '@faker-js/faker';
import { Category } from '../../../../features/programs/categories/entities/category.entity';
import { Partner } from '../../../../features/partners/partners/entities/partner.entity';
import { Partnership } from '../../../../features/partners/partnerships/entities/partnership.entity';
import { Program } from '../../../../features/programs/programs/entities/program.entity';
import { Type } from '../../../../features/programs/types/entities/type.entity';
import { Phase } from '../../../../features/programs/phases/phases/entities/phase.entity';
import { Requirement } from '../../../../features/programs/phases/requirements/entities/requirement.entity';

export default class ProgramSeeder implements Seeder {
  async run(dataSource: DataSource) {
    /**
     * Truncate tables
     */
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE TABLE partnership;');
    await dataSource.query('TRUNCATE TABLE program;');
    await dataSource.query('TRUNCATE TABLE type;');
    await dataSource.query('TRUNCATE TABLE phase;');
    await dataSource.query('TRUNCATE TABLE category;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');

    /**
     * Get repositories
     */
    const partnershipRepository = dataSource.getRepository(Partnership);
    const partnerRepository = dataSource.getRepository(Partner);
    const programRepository = dataSource.getRepository(Program);
    const typeRepository = dataSource.getRepository(Type);
    const phaseRepository = dataSource.getRepository(Phase);
    const requirementRepository = dataSource.getRepository(Requirement);
    const categoryRepository = dataSource.getRepository(Category);

    const createRequirements = async (count: number) => {
      return Promise.all(
        Array(count)
          .fill('')
          .map(() =>
            requirementRepository.save({
              name: faker.commerce.productName(),
              description: faker.commerce.productDescription()
            })
          )
      );
    };

    const createPhases = async (count: number) => {
      const requirements = await createRequirements(faker.number.int({ min: 1, max: 2 }));
      const form = JSON.stringify({
        iputs: Array(faker.number.int({ min: 4, max: 5 }))
          .fill('')
          .map(() => ({
            label: faker.commerce.department(),
            name: faker.commerce.productAdjective(),
            type: faker.helpers.arrayElement(['text', 'number', 'textarea'])
          }))
      }) as unknown as JSON;
      return Promise.all(
        Array(count)
          .fill('')
          .map(() =>
            phaseRepository.save({
              name: faker.finance.accountName(),
              description: faker.commerce.productAdjective(),
              started_at: faker.date.past(),
              ended_at: faker.date.future(),
              requirements,
              form
            })
          )
      );
    };

    const createTypes = async (count: number) => {
      return Promise.all(
        Array(count)
          .fill('')
          .map(() =>
            typeRepository.save({
              name: faker.commerce.productAdjective(),
              description: faker.commerce.productDescription()
            })
          )
      );
    };

    const createCategories = async (count: number) => {
      return Promise.all(
        Array(count)
          .fill('')
          .map(() =>
            categoryRepository.save({
              name: faker.commerce.department(),
              description: faker.commerce.productDescription()
            })
          )
      );
    };

    const createPartnerships = async (count: number): Promise<Partnership[]> => {
      return await Promise.all(
        Array(count)
          .fill('')
          .map(() =>
            partnershipRepository.save({
              name: faker.company.buzzAdjective()
            })
          )
      );
    };

    const createPartners = async (count: number): Promise<Partner[]> => {
      return await Promise.all(
        Array(count)
          .fill('')
          .map(async () =>
            partnerRepository.save({
              name: faker.company.name(),
              website_link: faker.internet.url(),
              description: faker.commerce.productDescription(),
              partnerships: await createPartnerships(faker.number.int({ min: 1, max: 2 }))
            })
          )
      );
    };

    const createPrograms = async (count: number): Promise<Program[]> => {
      return await Promise.all(
        Array(count)
          .fill('')
          .map(async () =>
            programRepository.save({
              name: faker.commerce.productName(),
              description: faker.commerce.productDescription(),
              targeted_audience: faker.commerce.productAdjective(),
              started_at: faker.date.past(),
              ended_at: faker.helpers.arrayElement([faker.date.past(), faker.date.future()]),
              types: await createTypes(faker.number.int({ min: 1, max: 2 })),
              phases: await createPhases(faker.number.int({ min: 1, max: 3 })),
              categories: await createCategories(faker.number.int({ min: 1, max: 2 })),
              partners: await createPartners(faker.number.int({ min: 1, max: 3 }))
            })
          )
      );
    };
    await createPrograms(50);
  }
}
