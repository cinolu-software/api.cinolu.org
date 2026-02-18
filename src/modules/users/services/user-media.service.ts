import { BadRequestException, Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class UserMediaService {
  constructor(private readonly usersService: UsersService) {}

  async uploadImage(currentUser: User, file: Express.Multer.File): Promise<User> {
    try {
      const oldUser = await this.usersService.findOne(currentUser.id);
      if (oldUser.profile) {
        await fs.unlink(`./uploads/profiles/${oldUser.profile}`).catch(() => undefined);
      }
      return await this.usersService.setProfileImage(oldUser.id, file.filename);
    } catch {
      throw new BadRequestException();
    }
  }
}
