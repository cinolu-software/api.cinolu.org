import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { Requirement } from './entities/requirement.entity';

@Controller('requirements')
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  @Post()
  create(@Body() dto: CreateRequirementDto): Promise<{ data: Requirement }> {
    return this.requirementsService.create(dto);
  }

  @Get()
  findAll(): Promise<{ data: Requirement[] }> {
    return this.requirementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Requirement }> {
    return this.requirementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRequirementDto): Promise<{ data: Requirement }> {
    return this.requirementsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requirementsService.remove(+id);
  }
}
