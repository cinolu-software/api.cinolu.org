import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { FilterArticlesDto } from './dto/filter-articles.dto';
import { User } from 'src/core/users/entities/user.entity';
import * as fs from 'fs-extra';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>
  ) {}

  async create(dto: CreateArticleDto, user: User): Promise<Article> {
    try {
      const article = this.articlesRepository.create({
        ...dto,
        published_at: dto.published_at ? new Date(dto.published_at) : new Date(),
        tags: dto.tags.map((id) => ({ id })),
        author: user
      });
      return await this.articlesRepository.save(article);
    } catch {
      throw new BadRequestException();
    }
  }

  async highlight(id: string): Promise<Article> {
    try {
      const article = await this.findOne(id);
      return await this.articlesRepository.save({
        ...article,
        is_highlighted: !article.is_highlighted
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addImage(id: string, file: Express.Multer.File): Promise<Article> {
    try {
      const article = await this.findOne(id);
      if (article.image) await fs.unlink(`./uploads/articles/${article.image}`);
      return await this.articlesRepository.save({ ...article, image: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async findRecent(): Promise<Article[]> {
    try {
      return await this.articlesRepository.find({
        order: { created_at: 'DESC' },
        take: 5,
        relations: ['tags', 'author']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(dto: FilterArticlesDto): Promise<[Article[], number]> {
    try {
      const { q, page } = dto;
      const query = this.articlesRepository.createQueryBuilder('a');
      if (q) query.andWhere('a.title LIKE :search OR a.content LIKE :search', { search: `%${q}%` });
      if (page) query.skip((+page - 1) * 30).take(30);
      return await query.orderBy('a.created_at', 'DESC').getManyAndCount();
    } catch {
      throw new BadRequestException();
    }
  }

  async findPublished(dto: FilterArticlesDto): Promise<[Article[], number]> {
    try {
      const { page } = dto;
      const query = this.articlesRepository
        .createQueryBuilder('a')
        .leftJoinAndSelect('a.tags', 'tags')
        .where('a.published_at <= NOW()');
      if (page) query.skip((+page - 1) * 12).take(12);
      return await query.orderBy('a.published_at', 'DESC').getManyAndCount();
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Article> {
    try {
      return await this.articlesRepository.findOneOrFail({
        where: { slug },
        relations: ['tags', 'author']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async togglePublished(id: string): Promise<Article> {
    const article = await this.findOne(id);
    article.published_at = article.published_at ? null : new Date();
    return await this.articlesRepository.save(article);
  }

  async findOne(id: string): Promise<Article> {
    try {
      return await this.articlesRepository.findOneOrFail({
        where: { id },
        relations: ['tags', 'author']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateArticleDto): Promise<Article> {
    try {
      const article = await this.findOne(id);
      this.articlesRepository.merge(article, {
        ...dto,
        tags: dto.tags.map((id) => ({ id }))
      });
      return await this.articlesRepository.save(article);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.articlesRepository.delete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
