import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectCategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProjectCategory as Category } from './entities/category.entity';
import { QueryParams } from './utils/query-params.type';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';

@Controller('project-categories')
export class ProjectCategoriesController {
  constructor(private readonly projectCategoriesService: ProjectCategoriesService) {}

  @Post()
  @UseRoles({ resource: 'projectCategories', action: 'create' })
  create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.projectCategoriesService.create(dto);
  }

  @Get()
  @Public()
  findAll(): Promise<Category[]> {
    return this.projectCategoriesService.findAll();
  }

  @Get('paginated')
  @UseRoles({ resource: 'projectCategories', action: 'read' })
  findPaginated(@Query() query: QueryParams): Promise<[Category[], number]> {
    return this.projectCategoriesService.findAllPaginated(query);
  }

  @Get(':id')
  @UseRoles({ resource: 'projectCategories', action: 'read' })
  findOne(@Param('id') id: string): Promise<Category> {
    return this.projectCategoriesService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'projectCategories', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<Category> {
    return this.projectCategoriesService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'projectCategories', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.projectCategoriesService.remove(id);
  }
}
