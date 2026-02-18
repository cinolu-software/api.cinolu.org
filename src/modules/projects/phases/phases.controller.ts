import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { PhasesService } from './phases.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { MoveParticipantsDto } from './dto/move-participants.dto';
import { Phase } from './entities/phase.entity';
import { UseRoles } from 'nest-access-control';
import { CreateDeliverableDto } from './dto/create-deliverable.dto';
import { PhaseDeliverable } from './entities/deliverable.entity';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { SubmitDeliverableDto } from './dto/submit-deliverable.dto';
import { PhaseDeliverableSubmission } from './entities/deliverable-submission.entity';
import { ReviewDeliverableDto } from './dto/review-deliverable.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { existsSync, mkdirSync } from 'fs';

@Controller('phases')
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}

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

  @Get(':phaseId/deliverables')
  @UseRoles({ resource: 'phases', action: 'read' })
  findDeliverables(@Param('phaseId') phaseId: string): Promise<PhaseDeliverable[]> {
    return this.phasesService.findDeliverables(phaseId);
  }

  @Get('project/:projectId')
  @UseRoles({ resource: 'phases', action: 'read' })
  findAllByProject(@Param('projectId') projectId: string): Promise<Phase[]> {
    return this.phasesService.findAll(projectId);
  }

  @Post(':phaseId/deliverables')
  @UseRoles({ resource: 'phases', action: 'update' })
  createDeliverable(
    @Param('phaseId') phaseId: string,
    @CurrentUser() user: User,
    @Body() dto: CreateDeliverableDto
  ): Promise<PhaseDeliverable> {
    return this.phasesService.createDeliverable(phaseId, user, dto);
  }

  @Post(':phaseId/deliverables/:deliverableId/submit')
  submitDeliverable(
    @Param('phaseId') phaseId: string,
    @Param('deliverableId') deliverableId: string,
    @CurrentUser() user: User,
    @Body() dto: SubmitDeliverableDto
  ): Promise<PhaseDeliverableSubmission> {
    return this.phasesService.submitDeliverable(phaseId, deliverableId, user, dto);
  }

  @Post(':phaseId/deliverables/:deliverableId/submit-file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (_req, _file, cb) {
          const destination = './uploads/deliverables';
          if (!existsSync(destination)) {
            mkdirSync(destination, { recursive: true });
          }
          cb(null, destination);
        },
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  submitDeliverableFile(
    @Param('phaseId') phaseId: string,
    @Param('deliverableId') deliverableId: string,
    @CurrentUser() user: User,
    @Query('participationId') participationId: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<PhaseDeliverableSubmission> {
    return this.phasesService.submitDeliverableFile(phaseId, deliverableId, participationId, file, user);
  }

  @Post(':phaseId/deliverables/:deliverableId/review/:participationId')
  @UseRoles({ resource: 'phases', action: 'update' })
  reviewDeliverable(
    @Param('phaseId') phaseId: string,
    @Param('deliverableId') deliverableId: string,
    @Param('participationId') participationId: string,
    @CurrentUser() reviewer: User,
    @Body() dto: ReviewDeliverableDto
  ): Promise<PhaseDeliverableSubmission> {
    return this.phasesService.reviewDeliverable(phaseId, deliverableId, participationId, reviewer, dto);
  }

  @Post('participants/move')
  @UseRoles({ resource: 'phases', action: 'update' })
  moveParticipants(@Body() dto: MoveParticipantsDto): Promise<void> {
    return this.phasesService.moveParticipants(dto);
  }

  @Post('participants/remove')
  @UseRoles({ resource: 'phases', action: 'update' })
  removeParticipantsFromPhase(@Body() dto: MoveParticipantsDto): Promise<void> {
    return this.phasesService.removeParticipantsFromPhase(dto);
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
