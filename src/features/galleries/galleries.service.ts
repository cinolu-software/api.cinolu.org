import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GalleriesService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>
  ) {}

  async create(file: Express.Multer.File): Promise<Gallery> {
    try {
      return await this.galleryRepository.save({
        image: file.filename
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.galleryRepository.delete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
