import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';
import { AddGalleryDto } from './dto/add-gallery.dto';

@Injectable()
export class GalleriesService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>
  ) {}

  async create(dto: AddGalleryDto): Promise<Gallery> {
    try {
      return await this.galleryRepository.save({
        ...dto,
        image: dto.image
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

  async remove(id: string): Promise<void> {
    try {
      const img = await this.findOne(id);
      await fs.remove(`./uploads/galleries/${img.image}`);
      await this.galleryRepository.delete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
