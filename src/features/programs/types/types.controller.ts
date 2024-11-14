import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { ProgramType } from './entities/type.entity';
import { Rights } from '@core/modules/auth/decorators/rights.decorators';
import { RightsEnum } from '@core/modules/auth/enums/rights.enum';

@Controller('program-types')
@Rights(RightsEnum.Staff)
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  create(@Body() createTypeDto: CreateTypeDto): Promise<{ data: ProgramType }> {
    return this.typesService.create(createTypeDto);
  }

  @Get()
  @Rights(RightsEnum.Guest)
  findAll(): Promise<{ data: ProgramType[] }> {
    return this.typesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: ProgramType }> {
    return this.typesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTypeDto): Promise<{ data: ProgramType }> {
    return this.typesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.typesService.remove(id);
  }
}
