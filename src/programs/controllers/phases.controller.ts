import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhasesService } from '../services/phases.service';
import { Phase } from '../entities/phase.entity';
import { Authorization } from '../../shared/decorators/rights.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';
import { CreatePhaseDto } from '../dto/create-phase.dto';
import { UpdatePhaseDto } from '../dto/update-phase.dto';

@Controller('program-phases')
@Authorization(RoleEnum.Staff)
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}

  @Post()
  create(@Body() dto: CreatePhaseDto): Promise<{ data: Phase }> {
    return this.phasesService.create(dto);
  }

  @Get()
  @Authorization(RoleEnum.Guest)
  findAll(): Promise<{ data: Phase[] }> {
    return this.phasesService.findAll();
  }

  @Get(':id')
  @Authorization(RoleEnum.Guest)
  findOne(@Param('id') id: string): Promise<{ data: Phase }> {
    return this.phasesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePhaseDto): Promise<{ data: Phase }> {
    return this.phasesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.phasesService.remove(id);
  }
}
