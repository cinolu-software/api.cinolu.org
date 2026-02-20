import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { PhaseDeliverablesService } from './services/deliverables.service';
import { CreateDeliverableDto } from './dto/create-deliverable.dto';
import { UpdateDeliverableDto } from './dto/update-deliverable.dto';
import { PhaseDeliverable } from './entities/deliverable.entity';

@Controller('phases/:phaseId/deliverables')
export class PhaseDeliverablesController {
  constructor(private readonly phaseDeliverablesService: PhaseDeliverablesService) {}

  @Post()
  @UseRoles({ resource: 'phases', action: 'create' })
  create(@Param('phaseId') phaseId: string, @Body() dto: CreateDeliverableDto): Promise<PhaseDeliverable> {
    return this.phaseDeliverablesService.create(phaseId, dto);
  }

  @Get(':deliverableId')
  @UseRoles({ resource: 'phases', action: 'read' })
  findOne(@Param('phaseId') phaseId: string, @Param('deliverableId') id: string): Promise<PhaseDeliverable> {
    return this.phaseDeliverablesService.findOne(phaseId, id);
  }

  @Patch(':deliverableId')
  @UseRoles({ resource: 'phases', action: 'update' })
  update(
    @Param('phaseId') phaseId: string,
    @Param('deliverableId') id: string,
    @Body() dto: UpdateDeliverableDto
  ): Promise<PhaseDeliverable> {
    return this.phaseDeliverablesService.update(phaseId, id, dto);
  }

  @Delete(':deliverableId')
  @UseRoles({ resource: 'phases', action: 'delete' })
  remove(@Param('phaseId') phaseId: string, @Param('deliverableId') id: string): Promise<void> {
    return this.phaseDeliverablesService.remove(phaseId, id);
  }
}
