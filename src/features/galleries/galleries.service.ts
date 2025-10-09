import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';

@Injectable()
export class GalleriesService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>
  ) {}

  async uploadProjectImage(projectId: string, file: Express.Multer.File): Promise<Gallery> {
    try {
      return await this.galleryRepository.save({
        project: { id: projectId },
        image: file.filename
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByProject(slug: string): Promise<Gallery[]> {
    try {
      return await this.galleryRepository.find({
        where: { project: { slug } },
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async uploadEventImage(eventId: string, file: Express.Multer.File): Promise<Gallery> {
    try {
      return await this.galleryRepository.save({
        event: { id: eventId },
        image: file.filename
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByEvent(slug: string): Promise<Gallery[]> {
    try {
      return await this.galleryRepository.find({
        where: { event: { slug } },
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async uploadVentureImage(ventureId: string, file: Express.Multer.File): Promise<Gallery> {
    try {
      return await this.galleryRepository.save({
        venture: { id: ventureId },
        image: file.filename
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async uploadArticleImage(articleId: string, file: Express.Multer.File): Promise<Gallery> {
    try {
      return await this.galleryRepository.save({
        article: { id: articleId },
        image: file.filename
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByArticle(slug: string): Promise<Gallery[]> {
    try {
      return await this.galleryRepository.find({
        where: { article: { slug } },
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByVenture(slug: string): Promise<Gallery[]> {
    try {
      return await this.galleryRepository.find({
        where: { venture: { slug } },
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Gallery> {
    try {
      return await this.galleryRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async uploadProductImage(productId: string, file: Express.Multer.File): Promise<Gallery> {
    try {
      return await this.galleryRepository.save({
        product: { id: productId },
        image: file.filename
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByProduct(slug: string): Promise<Gallery[]> {
    try {
      return await this.galleryRepository.find({
        where: { product: { slug } },
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async deleteArticleImage(id: string): Promise<void> {
    try {
      const gallery = await this.findOne(id);
      await this.galleryRepository.delete(id);
      await fs.remove(`./uploads/galleries/articles/${gallery.image}`);
    } catch {
      throw new BadRequestException();
    }
  }

  async deleteProjectImage(id: string): Promise<void> {
    try {
      const gallery = await this.findOne(id);
      await this.galleryRepository.delete(id);
      await fs.remove(`./uploads/galleries/projects/${gallery.image}`);
    } catch {
      throw new BadRequestException();
    }
  }

  async deleteEventImage(id: string): Promise<void> {
    try {
      const gallery = await this.findOne(id);
      await this.galleryRepository.delete(id);
      await fs.remove(`./uploads/galleries/events/${gallery.image}`);
    } catch {
      throw new BadRequestException();
    }
  }

  async deleteVentureImage(id: string): Promise<void> {
    try {
      const gallery = await this.findOne(id);
      await this.galleryRepository.delete(id);
      await fs.remove(`./uploads/galleries/ventures/${gallery.image}`);
    } catch {
      throw new BadRequestException();
    }
  }

  async deleteProductImage(id: string): Promise<void> {
    try {
      const gallery = await this.findOne(id);
      await this.galleryRepository.delete(id);
      await fs.remove(`./uploads/galleries/products/${gallery.image}`);
    } catch {
      throw new BadRequestException();
    }
  }
}
