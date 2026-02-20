import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { DeliverablesService } from './services/deliverables.service';
import { DeliverableSubmissionsService } from './services/deliverable-submissions.service';
import { CreateDeliverableDto } from './dto/create-deliverable.dto';
import { UpdateDeliverableDto } from './dto/update-deliverable.dto';
import { SubmitDeliverableDto } from './dto/submit-deliverable.dto';
import { Deliverable } from './entities/deliverable.entity';
import { DeliverableSubmission } from './entities/deliverable-submission.entity';
import { DelivrableParams } from './types/deliverables.types';

@Controller('phases/:phaseId/deliverables')
export class DeliverablesController {
  constructor(
    private readonly deliverablesService: DeliverablesService,
    private readonly submissionsService: DeliverableSubmissionsService
  ) {}

  @Post()
  @UseRoles({ resource: 'phases', action: 'create' })
  create(@Param('phaseId') phaseId: string, @Body() dto: CreateDeliverableDto): Promise<Deliverable> {
    return this.deliverablesService.create(phaseId, dto);
  }

  @Get(':deliverableId')
  @UseRoles({ resource: 'phases', action: 'read' })
  findOne(@Param() params: DelivrableParams): Promise<Deliverable> {
    return this.deliverablesService.findOne(params);
  }

  @Patch(':deliverableId')
  @UseRoles({ resource: 'phases', action: 'update' })
  update(@Param() params: DelivrableParams, @Body() dto: UpdateDeliverableDto): Promise<Deliverable> {
    return this.deliverablesService.update(params, dto);
  }

  @Post(':deliverableId/submit')
  submit(@Param() params: DelivrableParams, @Body() dto: SubmitDeliverableDto): Promise<DeliverableSubmission> {
    return this.submissionsService.submit(params, dto);
  }

  @Patch(':deliverableId/submissions/:submissionId')
  updateSubmission(
    @Param('submissionId') submissionId: string,
    @Body() dto: SubmitDeliverableDto
  ): Promise<DeliverableSubmission> {
    return this.submissionsService.update(submissionId, dto);
  }

  @Delete(':deliverableId/submissions/:submissionId')
  deleteSubmission(@Param('submissionId') submissionId: string): Promise<void> {
    return this.submissionsService.delete(submissionId);
  }

  @Delete(':deliverableId')
  @UseRoles({ resource: 'phases', action: 'delete' })
  remove(@Param() params: DelivrableParams): Promise<void> {
    return this.deliverablesService.remove(params);
  }
}
