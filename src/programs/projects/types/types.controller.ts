import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Auth } from '../../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../../shared/enums/roles.enum';
import { Type } from './entities/type.entity';

@Controller('project-types')
@Auth(RoleEnum.Staff)
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto): Promise<Type> {
    return this.typesService.create(createTypeDto);
  }

  @Get()
  @Auth(RoleEnum.Guest)
  findAll(): Promise<Type[]> {
    return this.typesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Type> {
    return this.typesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTypeDto): Promise<Type> {
    return this.typesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.typesService.remove(id);
  }
}
