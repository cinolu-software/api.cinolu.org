import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as fs from 'fs-extra';
import { QueryParams } from './utils/query-params.type';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  async create(user: User, dto: CreatePostDto): Promise<Post> {
    try {
      return await this.postRepository.save({
        ...dto,
        author: { id: user.id },
        category: { id: dto.category }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async getRecentPosts(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: ['author', 'category'],
      order: { created_at: 'DESC' },
      take: 3
    });
  }

  async findAll(queryParams: QueryParams): Promise<[Post[], number]> {
    const { page = 1, category, views, search } = queryParams;
    const take = 12;
    const skip = (page - 1) * take;
    const query = this.postRepository.createQueryBuilder('p').leftJoinAndSelect('p.category', 'category');
    if (category) query.andWhere('category.id = :category', { category });
    if (views) query.orderBy('p.views', 'DESC');
    if (search) query.andWhere('p.title LIKE :search OR p.content LIKE :search ', { search: `%${search}%` });
    return await query.take(take).skip(skip).orderBy('p.created_at', 'DESC').getManyAndCount();
  }

  async findOne(id: string): Promise<Post> {
    try {
      return await this.postRepository.findOneOrFail({
        where: { id },
        relations: ['comments', 'author', 'category']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Post> {
    try {
      return await this.postRepository.findOneOrFail({
        where: { slug },
        relations: ['comments', 'author', 'category']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async uploadImage(id: string, file: Express.Multer.File): Promise<Post> {
    try {
      const post = await this.findOne(id);
      if (post.image) await fs.unlink(`./uploads/posts/${post.image}`);
      return await this.postRepository.save({ ...post, image: file.filename });
    } catch {
      throw new BadRequestException("Erreur lors de la mise à jour de l'image");
    }
  }

  async update(id: string, dto: UpdatePostDto): Promise<Post> {
    try {
      const post = await this.findOne(id);
      return await this.postRepository.save({
        ...dto,
        author: { id: post.author.id },
        category: { id: dto?.category ?? post.category.id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.postRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
