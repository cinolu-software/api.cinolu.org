import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BlogCategory } from './entities/category.entity';
import { Auth } from '../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';

@Controller('blog-categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Auth(RoleEnum.Staff)
  create(@Body() dto: CreateCategoryDto): Promise<{ data: BlogCategory }> {
    return this.categoriesService.create(dto);
  }

  @Get()
  findAll(): Promise<{ data: BlogCategory[] }> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: BlogCategory }> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @Auth(RoleEnum.Staff)
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<{ data: BlogCategory }> {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Staff)
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
