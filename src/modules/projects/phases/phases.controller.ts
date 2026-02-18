import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PhasesService } from './services/phases.service';
import { PhaseParticipantsService } from './services/participations.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { MoveParticipantsDto } from './dto/move-participants.dto';
import { Phase } from './entities/phase.entity';
import { UseRoles } from 'nest-access-control';

@Controller('phases')
export class PhasesController {
  constructor(
    private readonly phasesService: PhasesService,
    private readonly phaseParticipantsService: PhaseParticipantsService
  ) {}

  @Post(':projectId')
  @UseRoles({ resource: 'phases', action: 'create' })
  create(@Param('projectId') projectId: string, @Body() dto: CreatePhaseDto): Promise<Phase> {
    return this.phasesService.create(projectId, dto);
  }

  @Get(':phaseId')
  @UseRoles({ resource: 'phases', action: 'read' })
  findOne(@Param('phaseId') phaseId: string): Promise<Phase> {
    return this.phasesService.findOne(phaseId);
  }

  @Get('project/:projectId')
  @UseRoles({ resource: 'phases', action: 'read' })
  findAllByProject(@Param('projectId') projectId: string): Promise<Phase[]> {
    return this.phasesService.findAll(projectId);
  }

  @Post('participants/move')
  @UseRoles({ resource: 'phases', action: 'update' })
  moveParticipants(@Body() dto: MoveParticipantsDto): Promise<void> {
    return this.phaseParticipantsService.moveParticipants(dto);
  }

  @Post('participants/remove')
  @UseRoles({ resource: 'phases', action: 'update' })
  removeParticipantsFromPhase(@Body() dto: MoveParticipantsDto): Promise<void> {
    return this.phaseParticipantsService.removeParticipantsFromPhase(dto);
  }

  @Patch(':phaseId')
  @UseRoles({ resource: 'phases', action: 'update' })
  update(@Param('phaseId') phaseId: string, @Body() dto: UpdatePhaseDto): Promise<Phase> {
    return this.phasesService.update(phaseId, dto);
  }

  @Delete(':phaseId')
  @UseRoles({ resource: 'phases', action: 'delete' })
  remove(@Param('phaseId') phaseId: string): Promise<void> {
    return this.phasesService.remove(phaseId);
  }
}
