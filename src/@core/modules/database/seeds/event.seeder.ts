// import { Seeder } from 'typeorm-extension';
// import { DataSource } from 'typeorm';
// import { fakerFR as faker } from '@faker-js/faker';
// import { Event } from '../../../../features/events/events/entities/event.entity';
// import { EventType } from '../../../../features/events/types/entities/type.entity';
// import { User } from '../../users/users/entities/user.entity';

// export default class EventSeeder implements Seeder {
//   async run(dataSource: DataSource) {
//     /**
//      * Truncate tables
//      */
//     await dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
//     await dataSource.query('TRUNCATE TABLE event;');
//     await dataSource.query('TRUNCATE TABLE event_type;');
//     await dataSource.query('SET FOREIGN_KEY_CHECKS = 1;');

//     /**
//      * Get repositories
//      */
//     const eventRepository = dataSource.getRepository(Event);
//     const typeRepository = dataSource.getRepository(EventType);
//     const userRepository = dataSource.getRepository(User);

//     const getStaffUsers = async (): Promise<User[]> => {
//       const users = await userRepository.findBy({
//         roles: { name: 'staff' }
//       });
//       return users;
//     };

//     const createTypes = async (count: number) => {
//       return Promise.all(
//         Array(count)
//           .fill('')
//           .map(() =>
//             typeRepository.save({
//               name: faker.commerce.productAdjective(),
//               description: faker.commerce.productDescription()
//             })
//           )
//       );
//     };

//     const createPrograms = async (count: number): Promise<Event[]> => {
//       const users = await getStaffUsers();
//       return await Promise.all(
//         Array(count)
//           .fill('')
//           .map(async () =>
//             eventRepository.save({
//               name: faker.commerce.productName(),
//               description: faker.commerce.productDescription(),
//               location: faker.location.city(),
//               attendees: faker.number.int({ min: 40, max: 50 }),
//               event_type: faker.helpers.arrayElement(['physical', 'online']),
//               online_link: faker.internet.url(),
//               started_at: faker.date.recent(),
//               ended_at: faker.helpers.arrayElement([faker.date.soon(), faker.date.past()]),
//               responsible: users[faker.number.int({ min: 1, max: 10 })],
//               types: await createTypes(faker.number.int({ min: 1, max: 2 }))
//             })
//           )
//       );
//     };
//     await createPrograms(23);
//   }
// }
