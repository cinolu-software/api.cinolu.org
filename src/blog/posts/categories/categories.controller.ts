import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PostCategory } from './entities/category.entity';
import { Auth } from 'src/shared/decorators/auth.decorators';
import { RoleEnum } from 'src/shared/enums/roles.enum';

@Controller('blog-categories')
@Auth(RoleEnum.Staff)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Auth(RoleEnum.Staff)
  create(@Body() dto: CreateCategoryDto): Promise<PostCategory> {
    return this.categoriesService.create(dto);
  }

  @Get()
  @Auth(RoleEnum.Guest)
  findAll(): Promise<PostCategory[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostCategory> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<PostCategory> {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
