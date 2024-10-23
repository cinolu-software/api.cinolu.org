import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartnershipsService } from './partnership.service';
import { CreatePartnershipDto } from './dto/create-partnership.dto';
import { UpdatePartnershipDto } from './dto/update-partnership.dto';
import { Partnership } from './entities/partnership.entity';

@Controller('partnerships')
export class PartnershipsController {
  constructor(private readonly partnershipTypesService: PartnershipsService) {}

  @Post()
  create(@Body() dto: CreatePartnershipDto): Promise<{ data: Partnership }> {
    return this.partnershipTypesService.create(dto);
  }

  @Get()
  findAll(): Promise<{ data: Partnership[] }> {
    return this.partnershipTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Partnership }> {
    return this.partnershipTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePartnershipDto): Promise<{ data: Partnership }> {
    return this.partnershipTypesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.partnershipTypesService.remove(id);
  }
}
