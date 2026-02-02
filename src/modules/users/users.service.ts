import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UpdateProfileDto from '@/core/auth/dto/update-profile.dto';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './roles/entities/role.entity';
import { User } from './entities/user.entity';
import { RolesService } from './roles/roles.service';
import { FilterUsersDto } from './dto/filter-users.dto';
import { format } from 'fast-csv';
import { Response } from 'express';
import { SignUpDto } from '@/core/auth/dto/sign-up.dto';
import { CreateWithGoogleDto } from '@/core/auth/dto/sign-up-with-google.dto';
import { ContactSupportDto } from './dto/contact-support.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { nanoid } from 'nanoid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolesService: RolesService,
    private eventEmitter: EventEmitter2
  ) {}

  async exportCSV(queryParams: FilterUsersDto, res: Response): Promise<void> {
    try {
      const { q } = queryParams;
      const query = this.userRepository
        .createQueryBuilder('user')
        .select(['user.name', 'user.email', 'user.phone_number'])
        .orderBy('user.updated_at', 'DESC');
      if (q) query.where('user.name LIKE :q OR user.email LIKE :q', { q: `%${q}%` });
      const users = await query.getMany();
      const csvStream = format({ headers: ['Name', 'Email', 'Phone Number'] });
      csvStream.pipe(res);
      users.forEach((user) => {
        csvStream.write({ Name: user.name, Email: user.email, 'Phone Number': user.phone_number });
      });
      csvStream.end();
    } catch {
      throw new BadRequestException();
    }
  }

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
      let role: Role;
      try {
        role = await this.rolesService.findByName(roleName);
      } catch {
        role = await this.rolesService.create({ name: roleName });
      }
      const user = await this.findOne(userId);
      user.roles = [role];
      return await this.userRepository.save(user);
    } catch {
      throw new BadRequestException();
    }
  }

  async contactUs(dto: ContactSupportDto): Promise<void> {
    try {
      this.eventEmitter.emit('contact.support', dto);
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

  async refferedUsers(page: number, user: User): Promise<[User[], number]> {
    try {
      const take = 20;
      const skip = (+page - 1) * take;
      return await this.userRepository.findAndCount({
        where: { referred_by: { id: user.id } },
        order: { created_at: 'DESC' },
        skip,
        take
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

  async saveRefferalCode(user: User): Promise<User> {
    try {
      await this.userRepository.update(user.id, {
        referral_code: this.generateRefferalCode()
      });
      return await this.findByEmail(user.email);
    } catch {
      throw new BadRequestException();
    }
  }

  private generateRefferalCode(): string {
    return nanoid(12);
  }

  async findAll(queryParams: FilterUsersDto): Promise<[User[], number]> {
    const { page = 1, q } = queryParams;
    const take = 50;
    const skip = (+page - 1) * take;
    const query = this.userRepository
      .createQueryBuilder('user')
      .loadRelationCountAndMap('user.referralsCount', 'user.referrals');
    if (q) query.where('user.name LIKE :q OR user.email LIKE :q', { q: `%${q}%` });
    return await query.skip(skip).take(take).getManyAndCount();
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

  async findOneByEmailOptional(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email: email.trim().toLowerCase() },
      relations: ['roles']
    });
  }

  async findOrCreateParticipant(payload: {
    name: string;
    email: string;
    phone_number?: string;
  }): Promise<{ user: User; created: boolean }> {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const existing = await this.findOneByEmailOptional(normalizedEmail);
    if (existing) {
      return { user: existing, created: false };
    }
    const role = await this.rolesService.findByName('user');
    const defaultPassword = 'user1234';
    const newUser = await this.userRepository.save({
      name: payload.name.trim(),
      email: normalizedEmail,
      phone_number: payload.phone_number?.trim() ?? null,
      password: defaultPassword,
      referral_code: this.generateRefferalCode(),
      roles: [role]
    });
    const user = await this.findOne(newUser.id);
    this.eventEmitter.emit('user.welcome-with-credentials', { user, password: defaultPassword });
    return { user, created: true };
  }

  async findOrCreate(dto: CreateWithGoogleDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: dto.email }
      });
      if (user) return await this.findByEmail(user.email);
      const role = await this.rolesService.findByName('user');
      return await this.createNewUser(dto, role);
    } catch {
      throw new BadRequestException();
    }
  }

  async createNewUser(dto: CreateWithGoogleDto, userRole: Role): Promise<User> {
    const newUser = await this.userRepository.save({
      ...dto,
      referral_code: this.generateRefferalCode(),
      roles: [userRole]
    });
    return await this.findOne(newUser.id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    try {
      const oldUser = await this.userRepository.findOneOrFail({
        where: { id },
        relations: ['roles']
      });
      delete oldUser.password;
      return await this.userRepository.save({
        ...oldUser,
        ...dto,
        roles: dto.roles?.map((id) => ({ id })) || oldUser.roles
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async updateProfile(currentUser: User, dto: UpdateProfileDto): Promise<User> {
    try {
      const oldUser = await this.userRepository.findOneOrFail({
        where: { id: currentUser.id },
        relations: ['roles']
      });
      delete oldUser.password;
      await this.userRepository.save({
        ...oldUser,
        ...dto,
        roles: dto.roles?.map((id) => ({ id })) || oldUser.roles
      });
      return await this.findOne(oldUser.id);
    } catch {
      throw new BadRequestException();
    }
  }

  async uploadImage(currentUser: User, file: Express.Multer.File): Promise<User> {
    try {
      const oldUser = await this.userRepository.findOneOrFail({
        where: { id: currentUser.id },
        relations: ['roles']
      });
      if (oldUser.profile) await fs.unlink(`./uploads/profiles/${oldUser.profile}`);
      delete oldUser.password;
      await this.userRepository.save({ ...oldUser, profile: file.filename });
      return await this.findOne(oldUser.id);
    } catch {
      throw new BadRequestException();
    }
  }

  async updatePassword(id: string, password: string): Promise<User> {
    try {
      const user = await this.findOne(id);
      await this.userRepository.update(user.id, { password });
      return await this.findOne(user.id);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.userRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
