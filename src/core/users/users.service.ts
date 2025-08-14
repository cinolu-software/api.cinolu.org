import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs-extra';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import UpdateProfileDto from '../auth/dto/update-profile.dto';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './roles/entities/role.entity';
import { User } from './entities/user.entity';
import { RolesService } from './roles/roles.service';
import { FilterUsersDto } from './dto/filter-users.dto';
import { format } from 'fast-csv';
import { Response } from 'express';
import { SignUpDto } from 'src/core/auth/dto/sign-up.dto';
import { CreateWithGoogleDto } from 'src/core/auth/dto/sign-up-with-google.dto';
import { ContactSupportDto } from './dto/contact-support.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

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

  async contactUs(dto: ContactSupportDto): Promise<void> {
    try {
      this.eventEmitter.emit('contact.support', dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async create(dto: CreateUserDto): Promise<User> {
    try {
      return  await this.userRepository.save({
        ...dto,
        password: 'user1234',
        roles: dto.roles?.map((id) => ({ id }))
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(queryParams: FilterUsersDto): Promise<[User[], number]> {
    const { page = 1, q } = queryParams;
    const take = 40;
    const skip = (+page - 1) * take;
    const query = this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.roles', 'roles');
    if (q) query.where('user.name LIKE :q OR user.email LIKE :q', { q: `%${q}%` });
    return await query.orderBy('user.created_at', 'DESC').skip(skip).take(take).getManyAndCount();
  }

  async signUp(dto: SignUpDto): Promise<User> {
    try {
      return await this.userRepository.save({
        ...dto,
        roles: dto.roles.map((id) => ({ id }))
      });
    } catch {
      throw new BadRequestException();
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
      const roles = user.roles.map((role) => role.name);
      return { ...user, roles } as unknown as User;
    } catch {
      throw new NotFoundException();
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
