import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { UseRoles } from 'nest-access-control';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UseRoles({ resource: 'products', action: 'create' })
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.create(dto);
  }

  @Get('venture/:id')
  @UseRoles({ resource: 'products', action: 'read' })
  findByVenture(@Param('id') id: string): Promise<Product[]> {
    return this.productsService.findByVenture(id);
  }

  @Get(':id')
  @UseRoles({ resource: 'products', action: 'read' })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'products', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto): Promise<Product> {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'products', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
