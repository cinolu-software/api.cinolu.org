import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { FilterCommentsDto } from './dto/filter-comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async create(user: User, dto: CreateCommentDto): Promise<Comment> {
    try {
      const comment = await this.commentRepository.save({
        ...dto,
        by: { id: user.id },
        post: { id: dto.post }
      });
      return await this.findOne(comment.id);
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

  async findAll(slug: string, querParams: FilterCommentsDto): Promise<[Comment[], number]> {
    try {
      const { page = 1 } = querParams;
      return await this.commentRepository
        .createQueryBuilder('c')
        .leftJoinAndSelect('c.by', 'by')
        .leftJoin('c.post', 'p')
        .where('p.slug = :slug', { slug })
        .orderBy('c.updated_at', 'DESC')
        .skip((page - 1) * 10)
        .take(page * 10)
        .getManyAndCount();
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateCommentDto): Promise<Comment> {
    try {
      const comment = await this.findOne(id);
      const updatedComment = Object.assign(comment, dto);
      await this.commentRepository.update(id, updatedComment);
      return await this.findOne(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.commentRepository.delete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
