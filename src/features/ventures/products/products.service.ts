import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { FilterProductsDto } from './dto/filter-products.dto';
import { User } from 'src/core/users/entities/user.entity';
import { GalleriesService } from 'src/features/galleries/galleries.service';
import { Gallery } from 'src/features/galleries/entities/gallery.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private galleryService: GalleriesService
  ) {}

  async findAll(user: User, query: FilterProductsDto): Promise<[Product[], number]> {
    try {
      const { page = 1 } = query;
      return await this.productsRepository.findAndCount({
        where: { venture: { owner: { id: user.id } } },
        order: { created_at: 'DESC' },
        take: 10,
        skip: (Number(page) - 1) * 10
      });
    } catch {
      throw new NotFoundException('Oups!!');
    }
  }

  async create(dto: CreateProductDto): Promise<Product> {
    try {
      return await this.productsRepository.save({
        ...dto,
        venture: { id: dto.ventureId }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addGallery(id: string, file: Express.Multer.File): Promise<void> {
    try {
      await this.findOne(id);
      const dto = {
        image: file.filename,
        product: { id }
      };
      await this.galleryService.create(dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async removeGallery(id: string): Promise<void> {
    try {
      await this.galleryService.remove(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async findGallery(slug: string): Promise<Gallery[]> {
    try {
      return (await this.findBySlug(slug)).gallery;
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Product> {
    try {
      return await this.productsRepository.findOneOrFail({
        where: { slug },
        relations: ['venture', 'gallery']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      return await this.productsRepository.findOneOrFail({
        where: { id },
        relations: ['gallery']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(slug: string, dto: UpdateProductDto): Promise<Product> {
    try {
      const product = await this.findBySlug(slug);
      const updated = Object.assign(product, dto);
      return await this.productsRepository.save(updated);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.productsRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
