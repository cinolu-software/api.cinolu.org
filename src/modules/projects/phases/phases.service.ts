import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { MoveParticipantsDto } from './dto/move-participants.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Phase } from './entities/phase.entity';
import { ProjectParticipation } from '@/modules/projects/entities/participation.entity';
import { PhaseDeliverable } from './entities/deliverable.entity';
import { PhaseDeliverableSubmission } from './entities/deliverable-submission.entity';
import { CreateDeliverableDto } from './dto/create-deliverable.dto';
import { User } from '@/modules/users/entities/user.entity';
import { SubmitDeliverableDto } from './dto/submit-deliverable.dto';
import { DeliverableType } from './types/deliverable-type.enum';
import { ReviewDeliverableDto } from './dto/review-deliverable.dto';
import { DeliverableReviewStatus } from './types/deliverable-review-status.enum';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>,
    @InjectRepository(ProjectParticipation)
    private readonly participationRepository: Repository<ProjectParticipation>,
    @InjectRepository(PhaseDeliverable)
    private readonly deliverableRepository: Repository<PhaseDeliverable>,
    @InjectRepository(PhaseDeliverableSubmission)
    private readonly submissionRepository: Repository<PhaseDeliverableSubmission>
  ) {}

  async create(projectId: string, dto: CreatePhaseDto): Promise<Phase> {
    try {
      return await this.phaseRepository.save({
        ...dto,
        project: { id: projectId }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(phaseId: string): Promise<Phase> {
    try {
      return await this.phaseRepository.findOneOrFail({
        where: { id: phaseId },
        relations: ['participations', 'participations.user', 'deliverables']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(phaseId: string, updatePhaseDto: UpdatePhaseDto): Promise<Phase> {
    try {
      await this.phaseRepository.update(phaseId, updatePhaseDto);
      return await this.findOne(phaseId);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(projectId: string): Promise<Phase[]> {
    return await this.phaseRepository.find({
      where: { project: { id: projectId } },
      relations: ['deliverables']
    });
  }

  async remove(phaseId: string): Promise<void> {
    try {
      const phase = await this.phaseRepository.findOneOrFail({ where: { id: phaseId } });
      await this.phaseRepository.softDelete(phase.id);
    } catch {
      throw new BadRequestException();
    }
  }

  async createDeliverable(phaseId: string, user: User, dto: CreateDeliverableDto): Promise<PhaseDeliverable> {
    try {
      const phase = await this.phaseRepository.findOneOrFail({ where: { id: phaseId } });
      return await this.deliverableRepository.save({
        ...dto,
        is_required: dto.is_required ?? true,
        phase,
        requested_by: { id: user.id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findDeliverables(phaseId: string): Promise<PhaseDeliverable[]> {
    await this.phaseRepository.findOneOrFail({ where: { id: phaseId } });
    return await this.deliverableRepository.find({
      where: { phase: { id: phaseId } },
      relations: ['submissions', 'submissions.participation', 'submissions.submitted_by', 'submissions.reviewed_by']
    });
  }

  private async findPhaseParticipationOrThrow(participationId: string, phaseId: string): Promise<ProjectParticipation> {
    const participation = await this.participationRepository.findOne({
      where: {
        id: participationId,
        phases: { id: phaseId }
      },
      relations: ['user', 'phases']
    });

    if (!participation) {
      throw new NotFoundException('Participation not found in this phase');
    }

    return participation;
  }

  private validateSubmissionByDeliverableType(type: DeliverableType, hasFile: boolean): void {
    if (type === DeliverableType.LINK && hasFile) {
      throw new BadRequestException('Links must be submitted as URL content');
    }
    if ((type === DeliverableType.DOCUMENT || type === DeliverableType.PICTURE) && !hasFile) {
      throw new BadRequestException('Documents or pictures must be submitted as a file');
    }
  }

  async submitDeliverable(
    phaseId: string,
    deliverableId: string,
    user: User,
    dto: SubmitDeliverableDto
  ): Promise<PhaseDeliverableSubmission> {
    try {
      const deliverable = await this.deliverableRepository.findOneOrFail({
        where: { id: deliverableId, phase: { id: phaseId } }
      });
      this.validateSubmissionByDeliverableType(deliverable.type, false);

      const participation = await this.findPhaseParticipationOrThrow(dto.participationId, phaseId);
      if (participation.user.id !== user.id) {
        throw new ForbiddenException('You can only submit your own deliverables');
      }

      const existing = await this.submissionRepository.findOne({
        where: { deliverable: { id: deliverable.id }, participation: { id: participation.id } }
      });

      return await this.submissionRepository.save({
        id: existing?.id,
        content: dto.content,
        mime_type: null,
        status: DeliverableReviewStatus.PENDING,
        feedback: null,
        reviewed_at: null,
        reviewed_by: null,
        deliverable,
        phase: { id: phaseId },
        participation,
        submitted_by: { id: user.id }
      });
    } catch (error) {
      if (error instanceof ForbiddenException || error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  async submitDeliverableFile(
    phaseId: string,
    deliverableId: string,
    participationId: string,
    file: Express.Multer.File,
    user: User
  ): Promise<PhaseDeliverableSubmission> {
    try {
      if (!file) {
        throw new BadRequestException('File is required');
      }

      const deliverable = await this.deliverableRepository.findOneOrFail({
        where: { id: deliverableId, phase: { id: phaseId } }
      });
      this.validateSubmissionByDeliverableType(deliverable.type, true);

      const participation = await this.findPhaseParticipationOrThrow(participationId, phaseId);
      if (participation.user.id !== user.id) {
        throw new ForbiddenException('You can only submit your own deliverables');
      }

      const existing = await this.submissionRepository.findOne({
        where: { deliverable: { id: deliverable.id }, participation: { id: participation.id } }
      });

      return await this.submissionRepository.save({
        id: existing?.id,
        content: file.filename,
        mime_type: file.mimetype,
        status: DeliverableReviewStatus.PENDING,
        feedback: null,
        reviewed_at: null,
        reviewed_by: null,
        deliverable,
        phase: { id: phaseId },
        participation,
        submitted_by: { id: user.id }
      });
    } catch (error) {
      if (error instanceof ForbiddenException || error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  async reviewDeliverable(
    phaseId: string,
    deliverableId: string,
    participationId: string,
    reviewer: User,
    dto: ReviewDeliverableDto
  ): Promise<PhaseDeliverableSubmission> {
    try {
      const submission = await this.submissionRepository.findOneOrFail({
        where: {
          deliverable: { id: deliverableId, phase: { id: phaseId } },
          participation: { id: participationId }
        }
      });

      return await this.submissionRepository.save({
        ...submission,
        status: dto.status,
        feedback: dto.feedback ?? null,
        reviewed_at: new Date(),
        reviewed_by: { id: reviewer.id }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  private async ensureAllRequiredDeliverablesApproved(phaseId: string, participationIds: string[]): Promise<void> {
    const requiredDeliverables = await this.deliverableRepository.find({
      where: {
        phase: { id: phaseId },
        is_required: true
      },
      select: ['id']
    });

    if (!requiredDeliverables.length || !participationIds.length) {
      return;
    }

    const requiredIds = requiredDeliverables.map((deliverable) => deliverable.id);
    const approvedSubmissions = await this.submissionRepository.find({
      where: {
        deliverable: { id: In(requiredIds) },
        participation: { id: In(participationIds) },
        status: DeliverableReviewStatus.APPROVED
      },
      relations: ['deliverable', 'participation']
    });

    const approvedPairs = new Set(approvedSubmissions.map((sub) => `${sub.deliverable.id}:${sub.participation.id}`));

    const hasMissing = requiredIds.some((deliverableId) =>
      participationIds.some((participationId) => !approvedPairs.has(`${deliverableId}:${participationId}`))
    );

    if (hasMissing) {
      throw new BadRequestException('All required deliverables must be approved before moving participants forward');
    }
  }

  async moveParticipants(dto: MoveParticipantsDto): Promise<void> {
    try {
      const phase = await this.phaseRepository.findOneOrFail({
        where: { id: dto.phaseId }
      });

      if (dto.fromPhaseId) {
        await this.ensureAllRequiredDeliverablesApproved(dto.fromPhaseId, dto.ids);
      }

      const participations = await this.participationRepository.find({
        where: { id: In(dto.ids) },
        relations: ['phases']
      });
      for (const p of participations) {
        const alreadyInPhase = p.phases?.some((ph) => ph.id === phase.id);
        if (alreadyInPhase) continue;
        p.phases = [...(p.phases ?? []), phase];
        await this.participationRepository.save(p);
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  async removeParticipantsFromPhase(dto: MoveParticipantsDto): Promise<void> {
    try {
      const participations = await this.participationRepository.find({
        where: { id: In(dto.ids) },
        relations: ['phases']
      });
      for (const p of participations) {
        p.phases = (p.phases ?? []).filter((ph) => ph.id !== dto.phaseId);
        await this.participationRepository.save(p);
      }
    } catch {
      throw new BadRequestException();
    }
  }
}
