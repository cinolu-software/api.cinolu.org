import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';
import { PhasesService } from './phases.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { Phase } from './entities/phase.entity';

@Controller('phases')
export class PhasesController {
  constructor(private phasesService: PhasesService) {}

  @Post()
  @UseRoles({ resource: 'projects', action: 'create' })
  create(@Body() dto: CreatePhaseDto): Promise<Phase> {
    return this.phasesService.create(dto);
  }

  @Get('project/:id')
  @Public()
  findByProject(@Param('id') id: string): Promise<Phase[]> {
    return this.phasesService.findByProject(id);
  }

  @Get(':id')
  @UseRoles({ resource: 'projects', action: 'read' })
  findOne(@Param('id') id: string): Promise<Phase> {
    return this.phasesService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'projects', action: 'update' })
  update(@Param('id') id: string, @Body() updatePhaseDto: UpdatePhaseDto): Promise<Phase> {
    return this.phasesService.update(id, updatePhaseDto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'projects', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.phasesService.remove(id);
  }
}
