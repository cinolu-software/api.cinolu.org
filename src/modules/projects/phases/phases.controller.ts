import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PhasesService } from './services/phases.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { Phase } from './entities/phase.entity';
import { Rbac } from 'nestjs-session-auth';

@Controller('phases')
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}

  @Post(':projectId')
  @Rbac({ resource: 'phases', action: 'create' })
  create(@Param('projectId') projectId: string, @Body() dto: CreatePhaseDto): Promise<Phase> {
    return this.phasesService.create(projectId, dto);
  }

  @Get(':phaseId')
  @Rbac({ resource: 'phases', action: 'read' })
  findOne(@Param('phaseId') phaseId: string): Promise<Phase> {
    return this.phasesService.findOne(phaseId);
  }

  @Get('project/:projectId')
  @Rbac({ resource: 'phases', action: 'read' })
  findAllByProject(@Param('projectId') projectId: string): Promise<Phase[]> {
    return this.phasesService.findAll(projectId);
  }

  @Patch(':phaseId')
  @Rbac({ resource: 'phases', action: 'update' })
  update(@Param('phaseId') phaseId: string, @Body() dto: UpdatePhaseDto): Promise<Phase> {
    return this.phasesService.update(phaseId, dto);
  }

  @Delete(':phaseId')
  @Rbac({ resource: 'phases', action: 'delete' })
  remove(@Param('phaseId') phaseId: string): Promise<void> {
    return this.phasesService.remove(phaseId);
  }
}
