import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EventCategory } from './entities/category.entity';
import { QueryParams } from './utils/query-params.type';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';

@Controller('events/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseRoles({ resource: 'eventCategories', action: 'create' })
  create(@Body() dto: CreateCategoryDto): Promise<EventCategory> {
    return this.categoriesService.create(dto);
  }

  @Get()
  @Public()
  findAll(): Promise<EventCategory[]> {
    return this.categoriesService.findAll();
  }

  @Get('paginated')
  @UseRoles({ resource: 'eventCategories', action: 'read' })
  findPaginated(@Query() query: QueryParams): Promise<[EventCategory[], number]> {
    return this.categoriesService.findAllPaginated(query);
  }

  @Get(':id')
  @UseRoles({ resource: 'eventCategories', action: 'read' })
  findOne(@Param('id') id: string): Promise<EventCategory> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'eventCategories', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<EventCategory> {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'eventCategories', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
