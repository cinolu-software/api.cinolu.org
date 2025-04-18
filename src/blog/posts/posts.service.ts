import { BadRequestException, ConflictException, Injectable, Req } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as fs from 'fs-extra';
import { QueryParams } from './utils/query-params.type';
import { Like } from './entities/like.entity';
import { View } from './entities/view.entity';
import { Request } from 'express';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    @InjectRepository(View)
    private viewRepository: Repository<View>
  ) {}

  async create(user: User, dto: CreatePostDto): Promise<Post> {
    try {
      return await this.postRepository.save({
        ...dto,
        author: { id: user.id },
        categories: dto.categories.map((category) => ({ id: category }))
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async getRecentPosts(): Promise<Post[]> {
    return await this.postRepository.find({
      relations: ['author', 'categories'],
      order: { created_at: 'DESC' },
      take: 3
    });
  }

  async findAll(queryParams: QueryParams): Promise<[Post[], count: number]> {
    const { page = 1, category, views } = queryParams;
    const take = 12;
    const skip = (page - 1) * take;
    const query = this.postRepository
      .createQueryBuilder('p')
      .loadRelationCountAndMap('p.likesCount', 'p.likes')
      .loadRelationCountAndMap('p.commentsCount', 'p.comments')
      .loadRelationCountAndMap('p.viewsCount', 'p.views')
      .leftJoin('p.categories', 'cat');
    if (category) query.andWhere('cat.name IN (:...categoriesArray)', { categoriesArray: [category] });
    if (views) query.orderBy('p.views', 'DESC');
    else query.orderBy('p.created_at', 'DESC');
    return await query.take(take).skip(skip).getManyAndCount();
  }

  async like(postId: string, userId: string): Promise<Post> {
    try {
      const existing = await this.likeRepository.findOne({
        where: {
          post: { id: postId },
          user: { id: userId }
        }
      });
      if (existing) throw new ConflictException();
      await this.likeRepository.save({ post: { id: postId }, user: { id: userId } });
      return await this.findOne(postId);
    } catch {
      throw new ConflictException();
    }
  }

  async unlike(postId: string, userId: string): Promise<Post> {
    try {
      const existing = await this.likeRepository.findOne({
        where: {
          post: { id: postId },
          user: { id: userId }
        }
      });
      if (!existing) throw new ConflictException();
      await this.likeRepository.delete(existing);
      return await this.findOne(postId);
    } catch {
      throw new ConflictException();
    }
  }

  async view(postId: string, @Req() req: Request): Promise<Post> {
    try {
      const ip = req.ip;
      const existing = await this.viewRepository.findOne({
        where: { post: { id: postId }, ip }
      });
      if (!existing) await this.viewRepository.save({ post: { id: postId }, ip });
      return await this.findOne(postId);
    } catch {
      throw new ConflictException();
    }
  }

  async findOne(id: string): Promise<Post> {
    try {
      return await this.postRepository.findOneOrFail({
        where: { id },
        relations: ['comments', 'author', 'views', 'likes']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Post> {
    try {
      return await this.postRepository
        .createQueryBuilder('p')
        .loadRelationCountAndMap('p.likesCount', 'p.likes')
        .loadRelationCountAndMap('p.commentsCount', 'p.comments')
        .loadRelationCountAndMap('p.viewsCount', 'p.views')
        .leftJoin('p.categories', 'cat')
        .leftJoinAndSelect('p.author', 'author')
        .where('p.slug = :slug', { slug })
        .getOne();
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
        categories: dto?.categories?.map((category) => ({ id: category })) || post.categories
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
