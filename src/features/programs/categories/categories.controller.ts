import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProgramCategory } from './entities/category.entity';
import { Rights } from '@core/modules/auth/decorators/rights.decorators';
import { RightsEnum } from '@core/modules/auth/enums/rights.enum';

@Controller('program-categories')
@Rights(RightsEnum.Staff)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<{ data: ProgramCategory }> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Rights(RightsEnum.Guest)
  findAll(): Promise<{ data: ProgramCategory[] }> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @Rights(RightsEnum.Guest)
  findOne(@Param('id') id: string): Promise<{ data: ProgramCategory }> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<{ data: ProgramCategory }> {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
