import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs-extra';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateWithGoogleDto, SignUpDto } from '../auth/dto';
import UpdateProfileDto from '../auth/dto/update-profile.dto';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './roles/entities/role.entity';
import { User } from './entities/user.entity';
import { RolesService } from './roles/roles.service';
import { generateRandomPassword } from 'src/shared/utils/generate-password.fn';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolesService: RolesService,
    private eventEmitter: EventEmitter2
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const password = generateRandomPassword();
      const user = await this.userRepository.save({
        ...dto,
        password,
        positions: dto.positions?.map((id) => ({ id })),
        expertises: dto.expertises?.map((id) => ({ id })),
        roles: dto.roles?.map((id) => ({ id }))
      });
      this.eventEmitter.emit('user.added', { user, password });
      return user;
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<User[]> {
    const data = await this.userRepository.find({
      relations: ['roles']
    });
    return data;
  }

  async findWithRole(name: string): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['roles'],
      where: { roles: { name } }
    });
  }

  async findByRole(id: string): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { roles: { id } }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByIds(ids: string[]): Promise<User[]> {
    return await this.userRepository.findBy({
      id: In(ids)
    });
  }

  async signUp(dto: SignUpDto): Promise<User> {
    try {
      const role = await this.rolesService.findByName('user');
      const password = generateRandomPassword();
      const user = await this.userRepository.save({
        ...dto,
        password,
        roles: [role]
      });
      this.eventEmitter.emit('user.added', { user, password });
      return user;
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
        positions: dto.positions?.map((id) => ({ id })),
        expertises: dto.expertises?.map((id) => ({ id })),
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
      await this.userRepository.save({ ...oldUser, ...dto });
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
