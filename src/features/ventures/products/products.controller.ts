import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { UseRoles } from 'nest-access-control';
import { FilterProductsDto } from './dto/filter-products.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from 'src/core/users/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.create(dto);
  }

  @Get('by-user')
  @UseRoles({ resource: 'products', action: 'read', possession: 'own' })
  findAll(@CurrentUser() user: User, @Query() query: FilterProductsDto): Promise<[Product[], number]> {
    return this.productsService.findAll(user, query);
  }

  @Get(':slug')
  @UseRoles({ resource: 'products', action: 'read', possession: 'own' })
  findOne(@Param('slug') slug: string): Promise<Product> {
    return this.productsService.findOne(slug);
  }

  @Patch(':id')
  @UseRoles({ resource: 'products', action: 'update', possession: 'own' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto): Promise<Product> {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'products', action: 'delete', possession: 'own' })
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
