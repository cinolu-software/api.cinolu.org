import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    private authService: AuthService
  ) {}

  async verifyToken(token: string): Promise<User> {
    return await this.authService.verifyToken(token);
  }

  async findAll(): Promise<Chat[]> {
    return await this.chatRepository.find({
      order: { created_at: 'DESC' }
    });
  }

  async create(dto: CreateChatDto): Promise<Chat> {
    try {
      return await this.chatRepository.save({
        ...dto,
        reply_to: { id: dto.reply_to },
        sender: { id: dto.sender }
      });
    } catch {
      throw new BadRequestException();
    }
  }
}
