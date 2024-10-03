import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs-extra';
import { SignupDto } from '../auth/dto/sign-up.dto';
import CreateUserDto from './dto/create-user.dto';
import { CreateWithGoogleDto } from '../auth/dto/sign-up-with-google.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UpdateProfileDto from '../auth/dto/update-profile.dto';
import { CurrentUser } from 'src/app/auth/decorators/user.decorator';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(dto: CreateUserDto): Promise<{ data: User }> {
    try {
      const exists: boolean = await this.userRepository.exists({
        where: { email: dto.email }
      });
      if (exists) new ConflictException("L'utilisateur existe déjà");
      const user: User = await this.userRepository.save({
        ...dto,
        password: '12345678',
        roles: dto.roles.map((id) => ({ id }))
      });
      return { data: user };
    } catch {
      throw new BadRequestException("Erreur lors de la création de l'utilisateur");
    }
  }

  async getUsersByIds(ids: number[]): Promise<{ data: User[] }> {
    const data = await this.userRepository.findBy({
      id: In(ids)
    });
    return { data };
  }

  async verifyEmail(email: string): Promise<{ data: User }> {
    try {
      const { data: user } = await this.findBy('email', email);
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
    try {
      const { data: user } = await this.findBy('email', email);
      if (user.verified_at === null) new BadRequestException();
      return { data: user };
    } catch {
      throw new BadRequestException("L'email n'a pas été vérifié");
    }
  }

  async signUp(dto: SignupDto): Promise<{ data: User }> {
    try {
      delete dto.password_confirm;
      const data: User = await this.userRepository.save({
        ...dto,
        roles: [{ name: 'user' }]
      });
      return { data };
    } catch {
      throw new BadRequestException('Cette adresse email est déjà utilisée');
    }
  }

  async findUsers(): Promise<{ data: User[] }> {
    const data: User[] = await this.userRepository.find({
      order: { created_at: 'DESC' }
    });
    return { data };
  }

  async findAdmins(): Promise<{ data: User[] }> {
    const data: User[] = await this.userRepository.find({
      where: { roles: { name: 'admin' } },
      relations: ['roles']
    });
    return { data };
  }

  async findOne(id: number): Promise<{ data: User }> {
    try {
      const data: User = await this.userRepository.findOneOrFail({
        where: { id },
        relations: ['roles']
      });
      return { data };
    } catch {
      throw new BadRequestException('Aucun utilisateur trouvé avec cet identifiant');
    }
  }

  async findBy(key: string, value: string): Promise<{ data: User }> {
    try {
      const data: User = await this.userRepository.findOneOrFail({ where: { [key]: value }, relations: ['roles'] });
      return { data };
    } catch {
      throw new NotFoundException('Aucun utilisateur trouvé');
    }
  }

  async findOrCreate(dto: CreateWithGoogleDto): Promise<{ data: User }> {
    try {
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
        roles: [{ name: 'user' }]
      });
      return { data: newUser };
    } catch {
      throw new BadRequestException("Erreur lors de la récupération de l'utilisateur");
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<{ data: User }> {
    try {
      const { data: user } = await this.findOne(id);
      const data: User = await this.userRepository.save({
        ...user,
        ...dto,
        roles: dto?.roles?.map((id) => ({ id })) || user.roles.map((role) => ({ id: role.id }))
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la modification de l'utilisateur");
    }
  }

  async updateProfile(@CurrentUser() currentUser: User, dto: UpdateProfileDto): Promise<{ data: User }> {
    const { data: user } = await this.findOne(currentUser.id);
    try {
      const updatedUser = Object.assign(user, dto);
      delete updatedUser.password;
      const data: User = await this.userRepository.save(updatedUser);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la modification du profil');
    }
  }

  async uploadImage(@CurrentUser() currenUser: User, image: Express.Multer.File): Promise<{ data: User }> {
    const { data: user } = await this.findOne(currenUser.id);
    try {
      if (user.profile) await fs.promises.unlink(`./uploads/profiles/${user.profile}`);
      const updatedUser = Object.assign(user, { profile: image.filename });
      delete updatedUser.password;
      const data = await this.userRepository.save(updatedUser);
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la mise à jour de l'image");
    }
  }

  async updatePassword(id: number, password: string): Promise<{ data: User }> {
    try {
      const { data } = await this.findOne(id);
      data.password = password;
      await this.userRepository.save(data);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la réinitialisation du mot de passe');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.userRepository.delete(id);
    } catch {
      throw new BadRequestException("Erreur lors de la suppression de l'utilisateur");
    }
  }
}
