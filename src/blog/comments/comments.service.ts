import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async create(user: User, dto: CreateCommentDto): Promise<{ data: Comment }> {
    try {
      const data = await this.commentRepository.save({
        ...dto,
        by: { id: user.id },
        post: { id: dto.post }
      });
      return { data };
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<{ data: Comment }> {
    try {
      const data = await this.commentRepository.findOneOrFail({
        where: { id },
        relations: ['by', 'post']
      });
      return { data };
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateCommentDto): Promise<{ data: Comment }> {
    try {
      const { data: comment } = await this.findOne(id);
      const data = await this.commentRepository.save({
        ...dto,
        post: { id: comment.post.id }
      });
      return { data };
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.commentRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
