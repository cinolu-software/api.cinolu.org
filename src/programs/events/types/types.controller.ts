import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { EventType } from './entities/type.entity';
import { TypesService } from './types.service';
import { Auth } from '../../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../../shared/enums/roles.enum';

@Controller('event-types')
@Auth(RoleEnum.Staff)
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto): Promise<EventType> {
    return this.typesService.create(createTypeDto);
  }

  @Get()
  @Auth(RoleEnum.Guest)
  findAll(): Promise<EventType[]> {
    return this.typesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EventType> {
    return this.typesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTypeDto): Promise<EventType> {
    return this.typesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.typesService.remove(id);
  }
}
