import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectorsService } from '../services/sectors.service';
import { CreateSectorDto } from '../dto/create-sector.dto';
import { UpdateSectorDto } from '../dto/update-sector.dto';
import { Sector } from '../entities/sectors.entity';
import { Authorization } from '../../shared/decorators/rights.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';

@Controller('sectors')
@Authorization(RoleEnum.User)
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Post()
  @Authorization(RoleEnum.Staff)
  create(@Body() dto: CreateSectorDto): Promise<{ data: Sector }> {
    return this.sectorsService.create(dto);
  }

  @Get()
  findAll(): Promise<{ data: Sector[] }> {
    return this.sectorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Sector }> {
    return this.sectorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSectorDto): Promise<{ data: Sector }> {
    return this.sectorsService.update(id, dto);
  }

  @Delete(':id')
  @Authorization(RoleEnum.Admin)
  remove(@Param('id') id: string): Promise<void> {
    return this.sectorsService.remove(id);
  }
}
