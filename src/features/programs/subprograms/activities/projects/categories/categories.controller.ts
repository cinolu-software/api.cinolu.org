import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProjectCategory as Category } from './entities/category.entity';
import { QueryParams } from './utils/query-params.type';
import { UseRoles } from 'nest-access-control';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('project-categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseRoles({ resource: 'projectCategories', action: 'create' })
  create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(dto);
  }

  @Get()
  @Public()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get('paginated')
  @UseRoles({ resource: 'projectCategories', action: 'read' })
  findAllPaginated(@Query() query: QueryParams): Promise<[Category[], number]> {
    return this.categoriesService.findAllPaginated(query);
  }

  @Get(':id')
  @UseRoles({ resource: 'projectCategories', action: 'read' })
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'projectCategories', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'projectCategories', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
