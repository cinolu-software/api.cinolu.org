import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { EventType } from './entities/type.entity';
import { Public } from '../../../core/auth/decorators/public.decorator';
import { Roles } from '../../../../common/access-control/decorators/roles.decorators';
import { RolesEnum } from '../../../../common/access-control/enums/roles.enum';

@Controller('event-types')
@Roles(RolesEnum.Staff)
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto): Promise<{ data: EventType }> {
    return this.typesService.create(createTypeDto);
  }

  @Get()
  @Public()
  @Roles(RolesEnum.Guest)
  findAll(): Promise<{ data: EventType[] }> {
    return this.typesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: EventType }> {
    return this.typesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTypeDto): Promise<{ data: EventType }> {
    return this.typesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.typesService.remove(id);
  }
}
