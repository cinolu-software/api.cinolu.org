import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EventCategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EventCategory } from './entities/category.entity';
import { QueryParams } from './utils/query-params.type';
import { Roles } from '@/core/auth/decorators/role.decorator';
import { Public } from '@/core/auth/decorators/public.decorator';

@Controller('event-categories')
export class EventCategoriesController {
  constructor(private readonly eventCategoriesService: EventCategoriesService) {}

  @Post()
  @Roles({ resource: 'eventCategories', action: 'create' })
  create(@Body() dto: CreateCategoryDto): Promise<EventCategory> {
    return this.eventCategoriesService.create(dto);
  }

  @Get()
  @Public()
  findAll(): Promise<EventCategory[]> {
    return this.eventCategoriesService.findAll();
  }

  @Get('paginated')
  @Roles({ resource: 'eventCategories', action: 'read' })
  findPaginated(@Query() query: QueryParams): Promise<[EventCategory[], number]> {
    return this.eventCategoriesService.findAllPaginated(query);
  }

  @Get(':id')
  @Roles({ resource: 'eventCategories', action: 'read' })
  findOne(@Param('id') id: string): Promise<EventCategory> {
    return this.eventCategoriesService.findOne(id);
  }

  @Patch(':id')
  @Roles({ resource: 'eventCategories', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<EventCategory> {
    return this.eventCategoriesService.update(id, dto);
  }

  @Delete(':id')
  @Roles({ resource: 'eventCategories', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.eventCategoriesService.remove(id);
  }
}
