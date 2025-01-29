import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as fs from 'fs-extra';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  async create(user: User, dto: CreatePostDto): Promise<{ data: Post }> {
    try {
      const data = await this.postRepository.save({
        ...dto,
        author: { id: user.id },
        category: { id: dto.category }
      });
      return { data };
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<{ data: Post[] }> {
    const data = await this.postRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: Post }> {
    try {
      const data = await this.postRepository.findOneOrFail({
        where: { id },
        relations: ['comments', 'author', 'category']
      });
      return { data };
    } catch {
      throw new BadRequestException();
    }
  }

  async uploadImage(id: string, file: Express.Multer.File): Promise<{ data: Post }> {
    try {
      const { data: post } = await this.findOne(id);
      if (post.image) await fs.unlink(`./uploads/posts/${post.image}`);
      const data = await this.postRepository.save({ ...post, image: file.filename });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la mise à jour de l'image");
    }
  }

  async update(id: string, dto: UpdatePostDto): Promise<{ data: Post }> {
    try {
      const { data: post } = await this.findOne(id);
      const data = await this.postRepository.save({
        ...dto,
        author: { id: post.author.id },
        category: { id: dto?.category ?? post.category.id }
      });
      return { data };
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
