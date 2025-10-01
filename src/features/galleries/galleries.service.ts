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

  async uploadImages(file: Express.Multer.File): Promise<Gallery> {
    try {
      return await this.galleryRepository.save({ image: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.galleryRepository.delete(id);
      await fs.remove(`./uploads/galleries/${id}`);
    } catch {
      throw new BadRequestException();
    }
  }
}
