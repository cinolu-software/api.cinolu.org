import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Auth } from '../../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../../shared/enums/roles.enum';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { Phase } from './entities/phase.entity';
import { PhasesService } from './phases.service';

@Controller('project-phases')
@Auth(RoleEnum.Staff)
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}

  @Post()
  create(@Body() dto: CreatePhaseDto): Promise<Phase> {
    return this.phasesService.create(dto);
  }

  @Get('project/:id')
  @Auth(RoleEnum.Guest)
  findByProject(@Param('id') id: string): Promise<Phase[]> {
    return this.phasesService.findByProject(id);
  }

  @Get()
  @Auth(RoleEnum.Guest)
  findAll(): Promise<Phase[]> {
    return this.phasesService.findAll();
  }

  @Get(':id')
  @Auth(RoleEnum.Guest)
  findOne(@Param('id') id: string): Promise<Phase> {
    return this.phasesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePhaseDto): Promise<Phase> {
    return this.phasesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.phasesService.remove(id);
  }
}
