import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { Auth } from '../../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../../shared/enums/roles.enum';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EventCategory } from './entities/category.entity';
import { QueryParams } from './utils/query-params.type';

@Controller('event-categories')
@Auth(RoleEnum.Staff)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<EventCategory> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Auth(RoleEnum.Guest)
  findAll(): Promise<EventCategory[]> {
    return this.categoriesService.findAll();
  }

  @Get('paginated')
  findAllPaginated(@Query() query: QueryParams): Promise<[EventCategory[], number]> {
    return this.categoriesService.findAllPaginated(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EventCategory> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<EventCategory> {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
