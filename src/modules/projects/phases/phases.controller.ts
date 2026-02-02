import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhasesService } from './phases.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { GroupUsersPhaseDto } from './dto/group-users-phase.dto';
import { Phase } from './entities/phase.entity';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';

@Controller('phases')
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}

  @Post()
  @UseRoles({ resource: 'phases', action: 'create' })
  create(@Body() createPhaseDto: CreatePhaseDto): Promise<Phase> {
    return this.phasesService.create(createPhaseDto);
  }

  @Post('group-participants')
  @UseRoles({ resource: 'phases', action: 'update' })
  groupParticipants(@Body() dto: GroupUsersPhaseDto): Promise<Phase> {
    return this.phasesService.groupParticipants(dto);
  }

  @Get(':slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Phase> {
    return this.phasesService.findBySlug(slug);
  }

  @Patch(':id')
  @UseRoles({ resource: 'phases', action: 'update' })
  update(@Param('id') id: string, @Body() updatePhaseDto: UpdatePhaseDto): Promise<Phase> {
    return this.phasesService.update(id, updatePhaseDto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'phases', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.phasesService.remove(id);
  }
}
