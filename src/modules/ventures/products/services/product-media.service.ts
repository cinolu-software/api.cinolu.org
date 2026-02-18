import { BadRequestException, Injectable } from '@nestjs/common';
import { GalleriesService } from '@/modules/galleries/galleries.service';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { ProductsService } from './products.service';

@Injectable()
export class ProductMediaService {
  constructor(
    private readonly galleriesService: GalleriesService,
    private readonly productsService: ProductsService
  ) {}

  async addGallery(id: string, file: Express.Multer.File): Promise<void> {
    try {
      await this.productsService.findOne(id);
      const dto = {
        image: file.filename,
        product: { id }
      };
      await this.galleriesService.create(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async removeGallery(id: string): Promise<void> {
    try {
      await this.galleriesService.remove(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async findGallery(slug: string): Promise<Gallery[]> {
    try {
      return await this.galleriesService.findGallery('product', slug);
    } catch {
      throw new BadRequestException();
    }
  }
}
