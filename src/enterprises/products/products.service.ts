import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import * as fs from 'fs-extra';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepository.save({
        ...dto,
        enterprise: { id: dto.enterpriseId }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByEnterprise(enterpriseId: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { enterprise: { id: enterpriseId } }
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    try {
      const product = await this.findOne(id);
      return await this.productRepository.save({
        ...product,
        ...dto,
        enterprise: { id: dto?.enterpriseId || product.enterprise.id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addImage(id: string, file: Express.Multer.File): Promise<Product> {
    try {
      const product = await this.findOne(id);
      if (product.image) await fs.remove(`./uploads/products/images/${product.image}`);
      return await this.productRepository.save({ ...product, image: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.productRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
