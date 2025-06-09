import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductImage } from './entities/product-image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly galeryRepository: Repository<ProductImage>
  ) {}

  addImages(id: string, files: Express.Multer.File[]): Promise<ProductImage[]> {
    try {
      return Promise.all(
        files.map(
          async (file) =>
            await this.galeryRepository.save({
              image: file.filename,
              call: { id }
            })
        )
      );
    } catch {
      throw new BadRequestException();
    }
  }

  async deleteImage(id: string): Promise<void> {
    try {
      const img = await this.galeryRepository.findOneOrFail({ where: { id } });
      await fs.unlink(`./uploads/calls/${img.image}`);
      await this.galeryRepository.delete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
