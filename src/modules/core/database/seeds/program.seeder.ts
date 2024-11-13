import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { fakerFR as faker } from '@faker-js/faker';
import { Partner } from '../../../features/programs/partners/entities/partner.entity';
import { Partnership } from '../../../features/programs/partnerships/entities/partnership.entity';
import { Program } from '../../../features/programs/programs/entities/program.entity';
import { Requirement } from '../../../features/programs/programs/modules/requirements/entities/requirement.entity';
import { ProgramType } from '../../../features/programs/types/entities/type.entity';
import { ProgramCategory } from '../../../features/programs/categories/entities/category.entity';

export default class ProgramSeeder implements Seeder {
  async run(dataSource: DataSource) {
    /**
     * Truncate tables
     */
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE TABLE partnership;');
    await dataSource.query('TRUNCATE TABLE program;');
    await dataSource.query('TRUNCATE TABLE requirement;');
    await dataSource.query('TRUNCATE TABLE program_type;');
    await dataSource.query('TRUNCATE TABLE program_category;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');

    /**
     * Get repositories
     */
    const partnershipRepository = dataSource.getRepository(Partnership);
    const partnerRepository = dataSource.getRepository(Partner);
    const programRepository = dataSource.getRepository(Program);
    const requirementRepository = dataSource.getRepository(Requirement);
    const typeRepository = dataSource.getRepository(ProgramType);
    const categoryRepository = dataSource.getRepository(ProgramCategory);

    /**
     * Create types
     * @param count
     */
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

    /**
     * Create types
     * @param count
     */
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

    /**
     * Create requirement
     * @param count
     */
    const createRequirements = async (count: number): Promise<Requirement[]> => {
      return await Promise.all(
        Array(count)
          .fill('')
          .map(() =>
            requirementRepository.save({
              name: faker.commerce.productAdjective(),
              description: faker.commerce.productDescription()
            })
          )
      );
    };

    /**
     * Create partnership
     * @param count
     */
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

    /**
     * Create partner
     * @param count
     */
    const createPartners = async (count: number): Promise<Partner[]> => {
      return await Promise.all(
        Array(count)
          .fill('')
          .map(async () =>
            partnerRepository.save({
              name: faker.company.name(),
              website_link: faker.internet.url(),
              description: faker.commerce.productDescription(),
              partnerships: await createPartnerships(10)
            })
          )
      );
    };

    /**
     * Create partner
     * @param count
     */
    const createProgram = async (count: number): Promise<Program[]> => {
      return await Promise.all(
        Array(count)
          .fill('')
          .map(async () =>
            programRepository.save({
              name: faker.commerce.productName(),
              description: faker.commerce.productDescription(),
              targeted_audience: faker.commerce.productAdjective(),
              started_at: faker.date.recent(),
              ended_at: faker.helpers.arrayElement([faker.date.soon(), faker.date.past()]),
              types: await createTypes(faker.number.int({ min: 1, max: 2 })),
              categories: await createCategories(faker.number.int({ min: 1, max: 2 })),
              requirements: await createRequirements(faker.number.int({ min: 1, max: 3 })),
              partners: await createPartners(faker.number.int({ min: 1, max: 5 }))
            })
          )
      );
    };
    await createProgram(50);
  }
}
