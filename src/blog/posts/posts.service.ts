import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as fs from 'fs-extra';
import { FilterPostsDto } from './dto/filter-posts.dto';
import { View } from './entities/view.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
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

  async findAll(queryParams: FilterPostsDto): Promise<[Post[], count: number]> {
    const { page = 1, category, views } = queryParams;
    const take = 12;
    const skip = (page - 1) * take;
    const query = this.postRepository
      .createQueryBuilder('p')
      .loadRelationCountAndMap('p.commentsCount', 'p.comments')
      .loadRelationCountAndMap('p.viewsCount', 'p.views')
      .leftJoin('p.categories', 'cat');
    if (category) query.andWhere('cat.name IN (:...categoriesArray)', { categoriesArray: [category] });
    if (views) query.orderBy('p.views', 'DESC');
    else query.orderBy('p.created_at', 'DESC');
    return await query.take(take).skip(skip).getManyAndCount();
  }

  async view(slug: string, ip: string): Promise<Post> {
    try {
      const post = await this.postRepository.findOne({
        where: { slug },
        relations: ['views']
      });
      if (!post) throw new NotFoundException();
      const alreadyViewed = post.views.some((view) => view.ip === ip);
      if (!alreadyViewed) await this.viewRepository.save({ ip, post });
      return await this.findBySlug(slug);
    } catch {
      throw new ConflictException();
    }
  }

  async findOne(id: string): Promise<Post> {
    try {
      return await this.postRepository.findOneOrFail({
        where: { id },
        relations: ['comments', 'author', 'views']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Post> {
    try {
      return await this.postRepository
        .createQueryBuilder('p')
        .loadRelationCountAndMap('p.commentsCount', 'p.comments')
        .loadRelationCountAndMap('p.viewsCount', 'p.views')
        .leftJoinAndSelect('p.categories', 'cat')
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
