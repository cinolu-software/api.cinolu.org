import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Partnership } from '../../../features/partnerships/entities/partnership.entity';
import { Program } from '../../../features/programs/entities/program.entity';
import { Requirement } from '../../../features/requirements/entities/requirement.entity';
import { Type } from '../../../features/types/entities/type.entity';
import { Partner } from '../../../features/partners/entities/partner.entity';
import { fakerFR as faker } from '@faker-js/faker';

export default class ProgramSeeder implements Seeder {
  async run(dataSource: DataSource) {
    /**
     * Truncate tables
     */
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
    await dataSource.query('TRUNCATE TABLE partnership;');
    await dataSource.query('TRUNCATE TABLE program;');
    await dataSource.query('TRUNCATE TABLE requirement;');
    await dataSource.query('TRUNCATE TABLE type;');
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');

    /**
     * Get repositories
     */
    const partnershipRepository = dataSource.getRepository(Partnership);
    const partnerRepository = dataSource.getRepository(Partner);
    const programRepository = dataSource.getRepository(Program);
    const requirementRepository = dataSource.getRepository(Requirement);
    const typeRepository = dataSource.getRepository(Type);

    /**
     * Create types
     * @param count
     */
    const createType = async (count: number) => {
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
     * Create requirement
     * @param count
     */
    const createRequirement = async (count: number): Promise<Requirement[]> => {
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
    const createPartnership = async (count: number): Promise<Partnership[]> => {
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
    const createPartner = async (count: number): Promise<Partner[]> => {
      return await Promise.all(
        Array(count)
          .fill('')
          .map(async () =>
            partnerRepository.save({
              name: faker.company.name(),
              description: faker.commerce.productDescription(),
              profile: faker.image.avatar(),
              partnerships: await createPartnership(10)
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
              start_at: faker.date.past(),
              end_at: faker.date.soon(),
              types: await createType(faker.number.int({ min: 1, max: 2 })),
              requirements: await createRequirement(faker.number.int({ min: 1, max: 3 })),
              partners: await createPartner(faker.number.int({ min: 1, max: 5 }))
            })
          )
      );
    };
    await createProgram(50);
  }
}
