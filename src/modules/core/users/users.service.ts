import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs-extra';
import { SignupDto } from '../auth/dto/sign-up.dto';
import CreateUserDto from './dto/create-user.dto';
import { CreateWithGoogleDto } from '../auth/dto/sign-up-with-google.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UpdateProfileDto from '../auth/dto/update-profile.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CurrentUser } from '../../../common/decorators/user.decorator';
import { RolesService } from '../roles/roles.service';
import AddDetailsDto from './dto/add-details.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleService: RolesService
  ) {}

  async findAll(): Promise<{ data: User[] }> {
    const data = await this.userRepository.find({
      relations: ['roles']
    });
    return { data };
  }

  async findCoachs(): Promise<{ data: User[] }> {
    const data = await this.userRepository.find({
      select: ['name', 'email', 'profile', 'google_image'],
      relations: ['roles'],
      where: { roles: { name: 'coach' } }
    });
    return { data };
  }

  async findStaffMembers(): Promise<{ data: User[] }> {
    const data = await this.userRepository.find({
      select: ['name', 'email', 'profile', 'google_image'],
      relations: ['roles'],
      where: { roles: { name: 'staff' } }
    });
    return { data };
  }

  async create(dto: CreateUserDto): Promise<{ data: User }> {
    try {
      const user: User = await this.userRepository.save({
        ...dto,
        password: '12345678',
        verified_at: new Date(),
        roles: dto.roles?.map((id) => ({ id }))
      });
      return { data: user };
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
      user.verified_at = new Date();
      delete user.password;
      const data = await this.userRepository.save(user);
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la vérification de l'email");
    }
  }

  async getVerifiedUser(email: string): Promise<{ data: User }> {
    const { data: user } = await this.findByEmail(email);
    if (!user.verified_at) throw new BadRequestException();
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

  async addDetails(@CurrentUser() currentUser: User, dto: AddDetailsDto): Promise<{ data: User }> {
    try {
      const { data: user } = await this.findOne(currentUser.id);
      const isCoach = user.roles.map((role) => role.name).includes('coach');
      if (!isCoach) throw new BadRequestException();
      delete user.password;
      const data = await this.userRepository.save({
        ...user,
        detail: {
          bio: dto?.bio,
          socials: dto?.socials,
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
        relations: ['roles', 'details', 'details.socials']
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
      if (user && !user.profile) {
        user.google_image = dto.google_image;
        await this.userRepository.save(user);
      }
      if (user) return { data: user };
      const newUser = await this.userRepository.save({
        ...dto,
        verified_at: new Date(),
        roles: [userRole]
      });
      return { data: newUser };
    } catch {
      throw new BadRequestException("Erreur lors de la récupération de l'utilisateur");
    }
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

  async updateProfile(@CurrentUser() currentUser: User, dto: UpdateProfileDto): Promise<{ data: User }> {
    try {
      const { data: user } = await this.findOne(currentUser.id);
      delete user.password;
      const data: User = await this.userRepository.save({ ...user, ...dto });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la modification du profil');
    }
  }

  async uploadImage(@CurrentUser() currenUser: User, file: Express.Multer.File): Promise<{ data: User }> {
    try {
      const { data: user } = await this.findOne(currenUser.id);

      if (user.profile) await fs.promises.unlink(`./uploads/profiles/${user.profile}`);
      delete user.password;
      const data = await this.userRepository.save({ ...user, profile: file.filename });
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
      await this.userRepository.delete(id);
    } catch {
      throw new BadRequestException("Erreur lors de la suppression de l'utilisateur");
    }
  }
}
