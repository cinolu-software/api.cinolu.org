import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Auth } from '../../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../../shared/enums/roles.enum';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProjectCategory as Category } from './entities/category.entity';
import { QueryParams } from './utils/query-params.type';

@Controller('project-categories')
@Auth(RoleEnum.Staff)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(dto);
  }
  @Get()
  @Auth(RoleEnum.Guest)
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get('paginated')
  findAllPaginated(@Query() query: QueryParams): Promise<[Category[], number]> {
    return this.categoriesService.findAllPaginated(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
