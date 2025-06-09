import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProductCategory } from './entities/category.entity';

@Controller('product-categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto): Promise<ProductCategory> {
    return this.categoriesService.create(dto);
  }

  @Get()
  findAll(): Promise<ProductCategory[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductCategory> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<ProductCategory> {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
