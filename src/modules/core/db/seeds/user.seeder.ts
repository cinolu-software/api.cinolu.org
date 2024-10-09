import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/core/users/entities/user.entity';
import { Role } from 'src/modules/core/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource) {
    const userRepository = dataSource.getRepository(User);
    const roleRepository = dataSource.getRepository(Role);

    await roleRepository.save([{ name: 'admin' }, { name: 'user' }, { name: 'staff' }, { name: 'coach' }]);
    const admin = await roleRepository.findOneBy({ name: 'admin' });

    await userRepository.save({
      name: 'Admin admin',
      address: 'Lubumbashi, RDC',
      phone_number: '+243999999999',
      email: 'admin@admin.com',
      verified_at: new Date(),
      password: await bcrypt.hash('admin1234', 10),
      roles: [admin]
    });
  }
}
