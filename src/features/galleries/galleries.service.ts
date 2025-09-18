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

  async findAll(): Promise<Gallery[]> {
    return await this.galleryRepository.createQueryBuilder('g').groupBy('g.event').addGroupBy('g.project').getMany();
  }

  async uploadImages(files: Express.Multer.File[]): Promise<Gallery[]> {
    try {
      const imgs = files.map((f) => this.galleryRepository.create({ image: f.filename }));
      return await this.galleryRepository.save(imgs);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.galleryRepository.softDelete(id);
      await fs.remove(`./uploads/galleries/${id}`);
    } catch {
      throw new BadRequestException();
    }
  }
}
