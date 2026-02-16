import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProgramCategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProgramCategory } from './entities/category.entity';
import { QueryParams } from './utils/query-params.type';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';

@Controller('program-categories')
export class ProgramCategoriesController {
  constructor(private readonly programCategoriesService: ProgramCategoriesService) {}

  @Get('')
  @Public()
  findAll(): Promise<ProgramCategory[]> {
    return this.programCategoriesService.findAll();
  }

  @Post()
  @UseRoles({ resource: 'programCategories', action: 'create' })
  create(@Body() dto: CreateCategoryDto): Promise<ProgramCategory> {
    return this.programCategoriesService.create(dto);
  }

  @Get('paginated')
  @UseRoles({ resource: 'programCategories', action: 'read' })
  findPaginated(@Query() query: QueryParams): Promise<[ProgramCategory[], number]> {
    return this.programCategoriesService.findPaginated(query);
  }

  @Get(':id')
  @UseRoles({ resource: 'programCategories', action: 'read' })
  findOne(@Param('id') id: string): Promise<ProgramCategory> {
    return this.programCategoriesService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'programCategories', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<ProgramCategory> {
    return this.programCategoriesService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'programCategories', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.programCategoriesService.remove(id);
  }
}
