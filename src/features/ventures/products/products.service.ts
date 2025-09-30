import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { GalleriesService } from '../../galleries/galleries.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private galleriesService: GalleriesService
  ) {}

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

  async addImages(id: string, files: Express.Multer.File[]): Promise<Product> {
    try {
      const project = await this.findOne(id);
      const gallery = await this.galleriesService.uploadImages(files);
      return await this.productsRepository.save({
        ...project,
        gallery: [...project.gallery, ...gallery]
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByVenture(ventureId: string): Promise<Product[]> {
    try {
      return await this.productsRepository.find({
        where: { venture: { id: ventureId } },
        relations: ['gallery'],
        order: { created_at: 'DESC' }
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

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    try {
      const product = await this.findOne(id);
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
