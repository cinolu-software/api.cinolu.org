import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs-extra';
import { In, IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SignupDto, CreateWithGoogleDto } from '../auth/dto';
import UpdateProfileDto from '../auth/dto/update-profile.dto';
import { DetailsService } from './details/details.service';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './roles/entities/role.entity';
import { User } from './entities/user.entity';
import { RolesService } from './roles/roles.service';
import { CreateDetailDto } from './details/dto/create-detail.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolesService: RolesService,
    private detailsService: DetailsService,
    private eventEmitter: EventEmitter2
  ) {}

  private async findWithRole(name: string): Promise<User[]> {
    const data = await this.userRepository.find({
      select: ['id', 'name', 'email', 'profile', 'google_image', 'address', 'phone_number'],
      relations: ['roles', 'detail'],
      where: { roles: { name } }
    });
    return data;
  }

  async findAll(): Promise<User[]> {
    const data = await this.userRepository.find({
      relations: ['roles']
    });
    return data;
  }

  async findCoachs(): Promise<User[]> {
    return this.findWithRole('coach');
  }

  async findStaff(): Promise<User[]> {
    return this.findWithRole('staff');
  }

  async findUsers(): Promise<User[]> {
    return this.findWithRole('user');
  }

  async findAdmins(): Promise<User[]> {
    return this.findWithRole('admin');
  }

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const password = Math.floor(100000 + Math.random() * 900000).toString();
      const user = await this.userRepository.save({
        ...dto,
        password,
        verified_at: new Date(),
        roles: dto.roles?.map((id) => ({ id }))
      });
      this.eventEmitter.emit('user.created', { user, password });
      return user;
    } catch {
      throw new BadRequestException();
    }
  }

  async findByRole(id: string): Promise<User[]> {
    try {
      const data = await this.userRepository.find({
        where: { roles: { id } }
      });
      return data;
    } catch {
      throw new BadRequestException();
    }
  }

  async findByIds(ids: string[]): Promise<User[]> {
    const data = await this.userRepository.findBy({
      id: In(ids)
    });
    return data;
  }

  async verifyEmail(email: string): Promise<User> {
    try {
      const oldUser = await this.findByEmail(email);
      delete oldUser.password;
      const user = await this.userRepository.save({
        ...oldUser,
        verified_at: new Date()
      });
      return user;
    } catch {
      throw new BadRequestException("Erreur lors de la vérification de l'email");
    }
  }

  async getVerifiedUser(email: string): Promise<User> {
    const data = await this.userRepository.findOneOrFail({
      where: { email, verified_at: Not(IsNull()) },
      relations: ['roles', 'detail', 'ventures']
    });
    const roles = data.roles.map((role) => role.name);
    const user = { ...data, roles } as unknown as User;
    return user;
  }

  async signUp(dto: SignupDto): Promise<User> {
    try {
      const role = await this.rolesService.findByName('user');
      delete dto.password_confirm;
      const user = await this.userRepository.save({
        ...dto,
        roles: [role]
      });
      return user;
    } catch {
      throw new BadRequestException('Cette adresse email est déjà utilisée');
    }
  }

  async addDetail(currentUser: User, dto: CreateDetailDto): Promise<User> {
    try {
      const user = await this.findOne(currentUser.id);
      delete user.password;
      const userDetail = { ...user.detail, ...dto };
      const detail = await this.detailsService.create(userDetail);
      await this.userRepository.save({ ...user, detail });
      return await this.getVerifiedUser(user.email);
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
        relations: ['roles', 'detail']
      });
      return user;
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
      return user;
    } catch {
      throw new NotFoundException();
    }
  }

  async findOrCreate(dto: CreateWithGoogleDto): Promise<User> {
    try {
      const role = await this.rolesService.findByName('user');
      const user = await this.userRepository.findOne({
        where: { email: dto.email }
      });
      if (user) return await this.#updateExistingUser(user, dto);
      return await this.#createNewUser(dto, role);
    } catch {
      throw new BadRequestException("Erreur lors de la récupération de l'utilisateur");
    }
  }

  async #updateExistingUser(currentUser: User, dto: CreateWithGoogleDto): Promise<User> {
    if (!currentUser.profile) {
      currentUser.google_image = dto.google_image;
      currentUser.verified_at = new Date();
      await this.userRepository.save(currentUser);
    }
    const user = await this.getVerifiedUser(currentUser.email);
    return user;
  }

  async #createNewUser(dto: CreateWithGoogleDto, userRole: Role): Promise<User> {
    const newUser = await this.userRepository.save({
      ...dto,
      verified_at: new Date(),
      roles: [userRole]
    });
    const user = await this.getVerifiedUser(newUser.email);
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    try {
      const oldUser = await this.findOne(id);
      const user = await this.userRepository.save({
        ...oldUser,
        ...dto,
        roles: dto.roles?.map((id) => ({ id })) || oldUser.roles
      });
      return user;
    } catch {
      throw new BadRequestException("Erreur lors de la modification de l'utilisateur");
    }
  }

  async updateProfile(currentUser: User, dto: UpdateProfileDto): Promise<User> {
    try {
      const oldUser = await this.findOne(currentUser.id);
      delete oldUser.password;
      await this.userRepository.save({ ...oldUser, ...dto });
      const user = await this.getVerifiedUser(oldUser.email);
      return user;
    } catch {
      throw new BadRequestException('Erreur lors de la modification du profil');
    }
  }

  async uploadImage(currenUser: User, file: Express.Multer.File): Promise<User> {
    try {
      const oldUser = await this.findOne(currenUser.id);
      if (oldUser.profile) await fs.unlink(`./uploads/profiles/${oldUser.profile}`);
      delete oldUser.password;
      await this.userRepository.save({ ...oldUser, profile: file.filename });
      const user = await this.getVerifiedUser(oldUser.email);
      return user;
    } catch {
      throw new BadRequestException("Erreur lors de la mise à jour de l'image");
    }
  }

  async updatePassword(id: string, password: string): Promise<User> {
    try {
      const user = await this.findOne(id);
      await this.userRepository.update(user.id, { password });
      return user;
    } catch {
      throw new BadRequestException('Erreur lors de la réinitialisation du mot de passe');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.userRepository.softDelete(id);
    } catch {
      throw new BadRequestException("Erreur lors de la suppression de l'utilisateur");
    }
  }
}
