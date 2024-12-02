import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs-extra';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import AddDetailsDto from './dto/add-details.dto';
import { SignupDto, CreateWithGoogleDto } from '../auth/dto';
import UpdateProfileDto from '../auth/dto/update-profile.dto';
import { Role } from './roles/entities/role.entity';
import { RolesService } from './roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RolesService
  ) {}

  private async findWithRole(name: string): Promise<{ data: User[] }> {
    const data = await this.userRepository.find({
      select: ['id', 'name', 'email', 'profile', 'google_image', 'address', 'phone_number'],
      relations: ['roles', 'detail'],
      where: { roles: { name } }
    });
    return { data };
  }

  async findAll(): Promise<{ data: User[] }> {
    const data = await this.userRepository.find({
      relations: ['roles']
    });
    return { data };
  }

  async findCoachs(): Promise<{ data: User[] }> {
    return this.findWithRole('coach');
  }

  async findStaff(): Promise<{ data: User[] }> {
    return this.findWithRole('staff');
  }

  async findUsers(): Promise<{ data: User[] }> {
    return this.findWithRole('user');
  }

  async findAdmins(): Promise<{ data: User[] }> {
    return this.findWithRole('admin');
  }

  async create(dto: CreateUserDto): Promise<{ data: User; password: string }> {
    try {
      const password = Math.floor(100000 + Math.random() * 900000).toString();
      const data: User = await this.userRepository.save({
        ...dto,
        password,
        verified_at: new Date(),
        roles: dto.roles?.map((id) => ({ id }))
      });
      return { data, password };
    } catch {
      throw new BadRequestException("Erreur lors de la création de l'utilisateur");
    }
  }

  async findByRole(id: string): Promise<{ data: User[] }> {
    try {
      const data = await this.userRepository.find({
        where: { roles: { id } }
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la création de l'utilisateur");
    }
  }

  async findByIds(ids: string[]): Promise<{ data: User[] }> {
    const data = await this.userRepository.findBy({
      id: In(ids)
    });
    return { data };
  }

  async verifyEmail(email: string): Promise<{ data: User }> {
    try {
      const { data: user } = await this.findByEmail(email);
      delete user.password;
      const data = await this.userRepository.save({
        ...user,
        verified_at: new Date()
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la vérification de l'email");
    }
  }

  async getVerifiedUser(email: string): Promise<{ data: User }> {
    const data = await this.userRepository.findOneOrFail({
      where: { email, verified_at: Not(IsNull()) },
      relations: ['roles']
    });
    const roles = data.roles.map((role) => role.name);
    const user = { ...data, roles } as unknown as User;
    return { data: user };
  }

  async signUp(dto: SignupDto): Promise<{ data: User }> {
    try {
      const { data: userRole } = await this.roleService.findByName('user');
      delete dto.password_confirm;
      const data: User = await this.userRepository.save({
        ...dto,
        roles: [userRole]
      });
      return { data };
    } catch {
      throw new BadRequestException('Cette adresse email est déjà utilisée');
    }
  }

  async addDetails(currentUser: User, dto: AddDetailsDto): Promise<{ data: User }> {
    try {
      const { data: user } = await this.findOne(currentUser.id);
      delete user.password;
      const data = await this.userRepository.save({
        ...user,
        detail: {
          ...dto,
          expertises: dto?.expertises.map((id) => ({ id })),
          positions: dto?.positions.map((id) => ({ id }))
        }
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findOne(id: string): Promise<{ data: User }> {
    try {
      const data: User = await this.userRepository.findOneOrFail({
        where: { id },
        relations: ['roles', 'detail']
      });
      return { data };
    } catch {
      throw new BadRequestException('Aucun utilisateur trouvé avec cet identifiant');
    }
  }

  async findByEmail(email: string): Promise<{ data: User }> {
    try {
      const data: User = await this.userRepository.findOneOrFail({ where: { email }, relations: ['roles'] });
      return { data };
    } catch {
      throw new NotFoundException('Aucun utilisateur trouvé');
    }
  }

  async findOrCreate(dto: CreateWithGoogleDto): Promise<{ data: User }> {
    try {
      const { data: userRole } = await this.roleService.findByName('user');
      const user = await this.userRepository.findOne({
        where: { email: dto.email }
      });
      if (user) return await this.#updateExistingUser(user, dto);
      return await this.#createNewUser(dto, userRole);
    } catch {
      throw new BadRequestException("Erreur lors de la récupération de l'utilisateur");
    }
  }

  async #updateExistingUser(user: User, dto: CreateWithGoogleDto): Promise<{ data: User }> {
    if (!user.profile) {
      user.google_image = dto.google_image;
      user.verified_at = new Date();
      await this.userRepository.save(user);
    }
    const { data } = await this.getVerifiedUser(user.email);
    return { data };
  }

  async #createNewUser(dto: CreateWithGoogleDto, userRole: Role): Promise<{ data: User }> {
    const newUser = await this.userRepository.save({
      ...dto,
      verified_at: new Date(),
      roles: [userRole]
    });
    const { data } = await this.getVerifiedUser(newUser.email);
    return { data };
  }

  async update(id: string, dto: UpdateUserDto): Promise<{ data: User }> {
    try {
      const { data: user } = await this.findOne(id);
      const data: User = await this.userRepository.save({
        ...user,
        ...dto,
        roles: dto.roles?.map((id) => ({ id })) || user.roles
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la modification de l'utilisateur");
    }
  }

  async updateProfile(currentUser: User, dto: UpdateProfileDto): Promise<{ data: User }> {
    try {
      const { data: user } = await this.findOne(currentUser.id);
      delete user.password;
      await this.userRepository.save({ ...user, ...dto });
      const { data } = await this.getVerifiedUser(user.email);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la modification du profil');
    }
  }

  async uploadImage(currenUser: User, file: Express.Multer.File): Promise<{ data: User }> {
    try {
      const { data: user } = await this.findOne(currenUser.id);
      if (user.profile) await fs.unlink(`./uploads/profiles/${user.profile}`);
      delete user.password;
      await this.userRepository.save({ ...user, profile: file.filename });
      const { data } = await this.getVerifiedUser(user.email);
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la mise à jour de l'image");
    }
  }

  async updatePassword(id: string, password: string): Promise<{ data: User }> {
    try {
      const { data } = await this.findOne(id);
      await this.userRepository.update(data.id, { password });
      return { data };
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
