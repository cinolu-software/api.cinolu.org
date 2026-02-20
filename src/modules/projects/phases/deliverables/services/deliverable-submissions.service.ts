import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliverableSubmission } from '../entities/deliverable-submission.entity';
import { SubmitDeliverableDto } from '../dto/submit-deliverable.dto';
import { DelivrableParams } from '../types/deliverables.types';
import { DeliverablesService } from './deliverables.service';

@Injectable()
export class DeliverableSubmissionsService {
  constructor(
    @InjectRepository(DeliverableSubmission)
    private readonly submissionRepository: Repository<DeliverableSubmission>,
    private readonly deliverablesService: DeliverablesService
  ) {}

  async submit(params: DelivrableParams, dto: SubmitDeliverableDto): Promise<DeliverableSubmission> {
    try {
      const deliverable = await this.deliverablesService.findOne(params.deliverableId);
      return await this.submissionRepository.save({
        content: dto.content,
        deliverable: { id: deliverable.id },
        participation: { id: dto.participationId }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<DeliverableSubmission> {
    try {
      return await this.submissionRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(submissionId: string, dto: SubmitDeliverableDto): Promise<DeliverableSubmission> {
    try {
      const submission = await this.findOne(submissionId);
      return await this.submissionRepository.save({
        ...submission,
        ...dto,
        participation: { id: dto.participationId }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async delete(submissionId: string): Promise<void> {
    try {
      await this.findOne(submissionId);
      await this.submissionRepository.softDelete({ id: submissionId });
    } catch {
      throw new BadRequestException();
    }
  }
}
