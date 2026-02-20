import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promises as fs } from 'fs';
import { Repository } from 'typeorm';
import { DeliverableSubmission } from '../entities/deliverable-submission.entity';
import { SubmitDeliverableDto } from '../dto/submit-deliverable.dto';
import { DeliverableType, DelivrableParams } from '../types/deliverables.types';
import { DeliverablesService } from './deliverables.service';

@Injectable()
export class DeliverableSubmissionsService {
  constructor(
    @InjectRepository(DeliverableSubmission)
    private readonly submissionRepository: Repository<DeliverableSubmission>,
    private readonly deliverablesService: DeliverablesService
  ) {}

  async submit(params: DelivrableParams, dto: SubmitDeliverableDto, file?: Express.Multer.File) {
    try {
      const deliverable = await this.deliverablesService.findOne(params.deliverableId);
      return await this.submissionRepository.save({
        content: this.isDocument(deliverable.type) ? file.filename : dto.content,
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
        where: { id },
        relations: ['deliverable', 'participation']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  private isDocument(type: DeliverableType): boolean {
    return [DeliverableType.DOCUMENT, DeliverableType.PICTURE].includes(type);
  }

  async update(id: string, dto: SubmitDeliverableDto, file?: Express.Multer.File) {
    try {
      const submission = await this.findOne(id);
      const isDoc = this.isDocument(submission.deliverable.type);
      const content = isDoc ? file.filename : dto.content;
      if (isDoc && submission.content) fs.unlink(`./uploads/deliverables/submissions/${submission.content}`);
      await this.submissionRepository.update(id, { content });
      return await this.findOne(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.submissionRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
