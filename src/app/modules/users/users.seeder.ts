import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersSeeder {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async seed(): Promise<{ data: User }> {
    try {
      await this.roleRepository.save([{ name: 'admin' }, { name: 'user' }, { name: 'staff' }, { name: 'coach' }]);
      const user: User = await this.userRepository.save({
        name: 'Admin admin',
        address: 'Lubumbashi, RDC',
        phone_number: '+243999999999',
        email: 'admin@admin.com',
        verified_at: new Date(),
        password: '12345678',
        roles: [{ id: 1 }]
      });
      return { data: user };
    } catch {
      throw new BadRequestException("Erreur lors de la création de l'utilisateur");
    }
  }
}
