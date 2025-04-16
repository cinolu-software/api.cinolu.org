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

  async create(user: User, dto: CreateCommentDto): Promise<Comment> {
    try {
      return await this.commentRepository.save({
        ...dto,
        by: { id: user.id },
        post: { id: dto.post }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Comment> {
    try {
      return await this.commentRepository.findOneOrFail({
        where: { id },
        relations: ['by', 'post']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  // Get comment by post id and load more functionality
  async findAll(slug: string, page: number): Promise<[Comment[], number]> {
    const take = 10;
    const skip = (page - 1) * take;
    try {
      return await this.commentRepository.findAndCount({
        where: { post: { slug } },
        relations: ['by'],
        take,
        skip,
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateCommentDto): Promise<Comment> {
    try {
      const comment = await this.findOne(id);
      return await this.commentRepository.save({
        ...dto,
        post: { id: comment.post.id }
      });
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
