import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectorsService } from '../services/sectors.service';
import { CreateSectorDto } from '../dto/create-sector.dto';
import { UpdateSectorDto } from '../dto/update-sector.dto';
import { Sector } from '../entities/sectors.entity';

@Controller('ventures')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Post()
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
  remove(@Param('id') id: string): Promise<void> {
    return this.sectorsService.remove(id);
  }
}
