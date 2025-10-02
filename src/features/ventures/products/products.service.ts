import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { FilterProductsDto } from './dto/filter-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ) {}

  async findAll(userId: string, query: FilterProductsDto): Promise<Product[]> {
    try {
      const { page } = query;
      return await this.productsRepository.find({
        where: { venture: { owner: { id: userId } } },
        order: { created_at: 'DESC' },
        take: 10,
        skip: (Number(page) - 1) * 10
      });
    } catch {
      throw new NotFoundException();
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

  async findOne(slug: string): Promise<Product> {
    try {
      return await this.productsRepository.findOneOrFail({
        where: { slug }
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
