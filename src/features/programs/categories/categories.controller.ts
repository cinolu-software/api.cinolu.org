import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProgramCategory } from './entities/category.entity';
import { QueryParams } from './utils/query-params.type';
import { UseRoles } from 'nest-access-control';
import { Public } from '../../../core/auth/decorators/public.decorator';

@Controller('program-categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseRoles({ resource: 'programCategories', action: 'create' })
  create(@Body() dto: CreateCategoryDto): Promise<ProgramCategory> {
    return this.categoriesService.create(dto);
  }

  @Get()
  @Public()
  findAll(): Promise<ProgramCategory[]> {
    return this.categoriesService.findAll();
  }

  @Get('paginated')
  @UseRoles({ resource: 'programCategories', action: 'read' })
  findAllPaginated(@Query() query: QueryParams): Promise<[ProgramCategory[], number]> {
    return this.categoriesService.findAllPaginated(query);
  }

  @Get(':id')
  @UseRoles({ resource: 'programCategories', action: 'read' })
  findOne(@Param('id') id: string): Promise<ProgramCategory> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'programCategories', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<ProgramCategory> {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'programCategories', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
