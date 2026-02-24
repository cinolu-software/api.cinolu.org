import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { FilterUsersDto } from '../dto/filter-users.dto';
import { SignUpDto } from '@/core/auth/dto/sign-up.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolesService: RolesService,
    private eventEmitter: EventEmitter2
  ) {}

  async findByIds(ids: string[]): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { id: In(ids) }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findStaff(): Promise<User[]> {
    try {
      const role = await this.rolesService.findByName('staff');
      return await this.userRepository.find({
        where: { roles: { id: role.id } },
        relations: ['roles']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async assignRole(userId: string, roleName: string): Promise<User> {
    try {
      const role = await this.rolesService.findByName(roleName);
      const user = await this.findOne(userId);
      user.roles = [role];
      return await this.userRepository.save(user);
    } catch {
      throw new BadRequestException();
    }
  }

  async create(dto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.save({
        ...dto,
        password: 'user1234',
        referral_code: this.generateRefferalCode(),
        roles: dto.roles?.map((id) => ({ id }))
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findEntrepreneurs(): Promise<User[]> {
    try {
      const query = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.ventures', 'ventures')
        .where('ventures.id IS NOT NULL');
      return await query.getMany();
    } catch {
      throw new BadRequestException();
    }
  }

  private generateRefferalCode(): string {
    return randomBytes(9).toString('base64url');
  }

  async findAll(queryParams: FilterUsersDto): Promise<[User[], number]> {
    try {
      const { page = 1, q } = queryParams;
      const take = 50;
      const skip = (+page - 1) * take;
      const query = this.userRepository
        .createQueryBuilder('u')
        .loadRelationCountAndMap('u.referralsCount', 'u.referrals');
      if (q) query.where('u.name LIKE :q OR u.email LIKE :q', { q: `%${q}%` });
      return await query.skip(skip).take(take).getManyAndCount();
    } catch {
      throw new BadRequestException();
    }
  }

  async refferedBy(referral_code: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { referral_code }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async signUp(dto: SignUpDto): Promise<User> {
    try {
      const role = await this.rolesService.findByName('user');
      let referredBy: User | null = null;
      if (dto.referral_code) referredBy = await this.refferedBy(dto.referral_code);
      const newUser = await this.userRepository.save({
        ...dto,
        referred_by: referredBy ? { id: referredBy.id } : null,
        referral_code: this.generateRefferalCode(),
        roles: [{ id: role.id }]
      });
      if (referredBy) {
        this.eventEmitter.emit('user.referral-signup', { referredBy, newUser });
      }
      return newUser;
    } catch {
      throw new BadRequestException('Cet utilisateur existe déjà');
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
        relations: ['roles']
      });
      const roles = user.roles.map((role) => role.name);
      return { ...user, roles } as unknown as User;
    } catch {
      throw new BadRequestException();
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email },
        relations: ['roles']
      });
      user['referralsCount'] = await this.userRepository.count({
        where: { referred_by: { id: user.id } }
      });
      const roles = user.roles.map((role) => role.name);
      return { ...user, roles } as unknown as User;
    } catch {
      throw new NotFoundException("Cet utilisateur n'existe pas");
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { email },
        relations: ['roles']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findOrCreate(dto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: dto.email },
        relations: ['roles']
      });
      if (user) {
        await this.userRepository.update(user.id, {
          ...dto,
          roles: user.roles
        });
        return await this.findByEmail(user.email);
      }
      const role = await this.rolesService.findByName('user');
      const newUser = await this.userRepository.save({
        ...dto,
        referral_code: this.generateRefferalCode(),
        roles: [role]
      });
      return await this.findOne(newUser.id);
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    try {
      const oldUser = await this.userRepository.findOneOrFail({
        where: { id },
        relations: ['roles']
      });
      delete oldUser.password;
      await this.userRepository.save({
        ...oldUser,
        ...dto,
        roles: dto.roles?.map((id) => ({ id })) || oldUser.roles
      });
      return this.findOne(id);
    } catch {
      throw new BadRequestException();
    }
  }

  // async updateProfile(currentUser: User, dto: UpdateProfileDto): Promise<User> {
  //   try {
  //     await this.userRepository.update(currentUser.id, dto);
  //     return await this.findOne(currentUser.id);
  //   } catch {
  //     throw new BadRequestException();
  //   }
  // }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.userRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
