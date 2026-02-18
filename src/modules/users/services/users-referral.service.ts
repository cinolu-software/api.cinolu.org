import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { User } from '../entities/user.entity';
import { FilterUsersDto } from '../dto/filter-users.dto';
import { UsersService } from './users.service';

@Injectable()
export class UsersReferralService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService
  ) {}

  async saveRefferalCode(user: User): Promise<User> {
    try {
      await this.userRepository.update(user.id, {
        referral_code: this.generateRefferalCode()
      });
      return await this.usersService.findByEmail(user.email);
    } catch {
      throw new BadRequestException();
    }
  }

  async refferedUsers(page: number, user: User): Promise<[User[], number]> {
    try {
      const take = 20;
      const skip = (+page - 1) * take;
      return await this.userRepository
        .createQueryBuilder('u')
        .loadRelationCountAndMap('u.referralsCount', 'u.referrals')
        .where('u.referred_by.id = :id', { id: user.id })
        .orderBy('u.created_at', 'DESC')
        .skip(skip)
        .take(take)
        .getManyAndCount();
    } catch {
      throw new BadRequestException();
    }
  }

  async findAmbassadors(queryParams: FilterUsersDto): Promise<[User[], number]> {
    const { page = 1, q } = queryParams;
    const take = 50;
    const skip = (+page - 1) * take;
    const query = this.userRepository
      .createQueryBuilder('u')
      .loadRelationCountAndMap('u.referralsCount', 'u.referrals');
    if (q) query.andWhere('u.name LIKE :q OR u.email LIKE :q', { q: `%${q}%` });
    const users = await query.skip(skip).take(take).getMany();
    const filteredUsers = users
      .filter((entry) => entry['referralsCount'] > 0)
      .sort((a, b) => b['referralsCount'] - a['referralsCount']);
    return [filteredUsers, filteredUsers.length];
  }

  async findAmbassadorByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.ventures', 'ventures')
        .loadRelationCountAndMap('user.referralsCount', 'user.referrals')
        .leftJoinAndSelect('ventures.gallery', 'gallery')
        .leftJoinAndSelect('ventures.products', 'products')
        .leftJoinAndSelect('products.gallery', 'productsGallery')
        .where('user.email = :email', { email })
        .getOneOrFail();
    } catch {
      throw new NotFoundException();
    }
  }

  private generateRefferalCode(): string {
    return randomBytes(9).toString('base64url');
  }
}
