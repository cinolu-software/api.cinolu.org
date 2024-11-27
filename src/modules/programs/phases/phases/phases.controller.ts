import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhasesService } from './phases.service';
import { CreatePhaseDto, UpdatePhaseDto } from './dto';
import { Phase } from './entities/phase.entity';
import { Rights } from '../../../../shared/decorators/rights.decorators';
import { RightsEnum } from '../../../../shared/enums/rights.enum';

@Controller('program-phases')
@Rights(RightsEnum.Staff)
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}

  @Post()
  create(@Body() dto: CreatePhaseDto): Promise<{ data: Phase }> {
    return this.phasesService.create(dto);
  }

  @Get()
  @Rights(RightsEnum.Guest)
  findAll(): Promise<{ data: Phase[] }> {
    return this.phasesService.findAll();
  }

  @Get(':id')
  @Rights(RightsEnum.Guest)
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
