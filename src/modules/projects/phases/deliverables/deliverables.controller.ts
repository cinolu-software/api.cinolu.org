import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { PhaseDeliverablesService } from './services/deliverables.service';
import { CreateDeliverableDto } from './dto/create-deliverable.dto';
import { UpdateDeliverableDto } from './dto/update-deliverable.dto';
import { PhaseDeliverable } from './entities/deliverable.entity';
import { DelivrableParams } from './types/deliverables.types';

@Controller('phases/:phaseId/deliverables')
export class PhaseDeliverablesController {
  constructor(private readonly deliverablesService: PhaseDeliverablesService) {}

  @Post()
  @UseRoles({ resource: 'phases', action: 'create' })
  create(@Param('phaseId') phaseId: string, @Body() dto: CreateDeliverableDto): Promise<PhaseDeliverable> {
    return this.deliverablesService.create(phaseId, dto);
  }

  @Get(':deliverableId')
  @UseRoles({ resource: 'phases', action: 'read' })
  findOne(@Param() params: DelivrableParams): Promise<PhaseDeliverable> {
    return this.deliverablesService.findOne(params);
  }

  @Patch(':deliverableId')
  @UseRoles({ resource: 'phases', action: 'update' })
  update(@Param() params: DelivrableParams, @Body() dto: UpdateDeliverableDto): Promise<PhaseDeliverable> {
    return this.deliverablesService.update(params, dto);
  }

  @Delete(':deliverableId')
  @UseRoles({ resource: 'phases', action: 'delete' })
  remove(@Param() params: DelivrableParams): Promise<void> {
    return this.deliverablesService.remove(params);
  }
}
