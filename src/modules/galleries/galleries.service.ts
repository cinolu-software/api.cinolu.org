import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { Gallery } from './entities/gallery.entity';
import { AddGalleryDto } from './dto/add-gallery.dto';

@Injectable()
export class GalleriesService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>
  ) {}

  async create(dto: AddGalleryDto): Promise<Gallery> {
    try {
      console.log(dto);
      const gallery = this.galleryRepository.create(dto);

      return await this.galleryRepository.save(gallery);
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
      throw new NotFoundException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const gallery = await this.findOne(id);
      await this.removeImageFile(gallery.image);
      await this.galleryRepository.delete(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async findProjectGallery(slug: string): Promise<Gallery[]> {
    try {
      return this.galleryRepository.find({
        where: { project: { slug } }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findEventGallery(slug: string): Promise<Gallery[]> {
    try {
      return this.galleryRepository.find({
        where: { event: { slug } }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  private async removeImageFile(filename: string): Promise<void> {
    try {
      await fs.unlink(`./uploads/galleries/${filename}`);
    } catch {
      throw new BadRequestException();
    }
  }
}
