import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { FormsService } from '../forms/forms.service';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
    private formsService: FormsService
  ) {}

  async create(dto: CreateSubmissionDto): Promise<Submission> {
    try {
      const { formId: formId, ...submissionPayload } = dto;
      const form = await this.formsService.findOne(formId);
      const submission = this.submissionRepository.create({
        ...submissionPayload,
        form
      });
      return await this.submissionRepository.save(submission);
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Submission> {
    try {
      return await this.submissionRepository.findOneOrFail({
        where: { id },
        relations: ['form', 'form.phase']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByForm(formId: string): Promise<Submission[]> {
    try {
      return await this.submissionRepository.find({
        where: { form: { id: formId } },
        relations: ['form', 'form.phase'],
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByPhase(phaseId: string): Promise<Submission[]> {
    try {
      return await this.submissionRepository.find({
        where: { form: { phase: { id: phaseId } } },
        relations: ['form', 'form.phase'],
        order: { created_at: 'DESC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateSubmissionDto): Promise<Submission> {
    try {
      const submission = await this.findOne(id);
      const { formId: formId, ...updatePayload } = dto;
      Object.assign(submission, updatePayload);
      if (formId) submission.form = await this.formsService.findOne(formId);
      return await this.submissionRepository.save(submission);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const submission = await this.findOne(id);
      await this.submissionRepository.softRemove(submission);
    } catch {
      throw new BadRequestException();
    }
  }
}
