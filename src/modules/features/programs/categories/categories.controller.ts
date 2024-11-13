import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProgramCategory } from './entities/category.entity';
import { Public } from '../../../core/auth/decorators/public.decorator';
import { Roles } from '../../../core/access-control/decorators/roles.decorators';
import { RolesEnum } from '../../../core/access-control/enums/roles.enum';

@Controller('program-categories')
@Roles(RolesEnum.Staff)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<{ data: ProgramCategory }> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Public()
  @Roles(RolesEnum.Guest)
  findAll(): Promise<{ data: ProgramCategory[] }> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @Public()
  @Roles(RolesEnum.Guest)
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
