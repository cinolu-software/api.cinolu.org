import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhasesService } from './phases.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { MoveParticipantsDto } from './dto/move-participants.dto';
import { Phase } from './entities/phase.entity';
import { UseRoles } from 'nest-access-control';

@Controller('phases')
export class PhasesController {
  constructor(private phasesService: PhasesService) {}

  @Post(':id')
  @UseRoles({ resource: 'phases', action: 'create' })
  create(@Param('id') id: string, @Body() dto: CreatePhaseDto): Promise<Phase> {
    return this.phasesService.create(id, dto);
  }

  @Get(':id')
  @UseRoles({ resource: 'phases', action: 'read' })
  findOne(@Param('id') id: string): Promise<Phase> {
    return this.phasesService.findOne(id);
  }

  @Post('move-participants')
  @UseRoles({ resource: 'phases', action: 'update' })
  moveParticipants(@Body() dto: MoveParticipantsDto): Promise<void> {
    return this.phasesService.moveParticipants(dto);
  }

  @Post('remove-participants')
  @UseRoles({ resource: 'phases', action: 'update' })
  removeParticipantsFromPhase(@Body() dto: MoveParticipantsDto): Promise<void> {
    return this.phasesService.removeParticipantsFromPhase(dto);
  }

  @Patch(':id')
  @UseRoles({ resource: 'phases', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdatePhaseDto): Promise<Phase> {
    return this.phasesService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'phases', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.phasesService.remove(id);
  }
}
