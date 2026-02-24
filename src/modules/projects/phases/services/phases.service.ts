import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhaseDto } from '../dto/create-phase.dto';
import { UpdatePhaseDto } from '../dto/update-phase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phase } from '../entities/phase.entity';
import { DeliverablesService } from '../deliverables/services/deliverables.service';
import { MentorsService } from '@/modules/mentors/services/mentors.service';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>,
    private readonly deliverablesService: DeliverablesService,
    private readonly mentorsService: MentorsService
  ) {}

  async create(projectId: string, dto: CreatePhaseDto): Promise<Phase> {
    try {
      const { deliverables, mentors, ...phaseData } = dto;
      const approvedMentors = mentors?.length ? await this.mentorsService.findApprovedByIds(mentors) : [];
      const phase = await this.phaseRepository.save({
        ...phaseData,
        project: { id: projectId },
        mentors: approvedMentors.map((mentor) => ({ id: mentor.id }))
      });
      if (deliverables) await this.deliverablesService.createMany(phase.id, deliverables);
      return await this.findOne(phase.id);
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(phaseId: string): Promise<Phase> {
    try {
      return await this.phaseRepository.findOneOrFail({
        where: { id: phaseId },
        relations: ['participations', 'participations.user', 'deliverables', 'mentors', 'mentors.owner']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(phaseId: string, updatePhaseDto: UpdatePhaseDto): Promise<Phase> {
    try {
      const { deliverables, mentors, ...phaseData } = updatePhaseDto;
      const phase = await this.findOne(phaseId);
      const approvedMentors =
        mentors === undefined ? phase.mentors : await this.mentorsService.findApprovedByIds(mentors);
      await this.phaseRepository.save({
        ...phase,
        ...phaseData,
        mentors: approvedMentors.map((mentor) => ({ id: mentor.id }))
      });
      if (deliverables) await this.deliverablesService.syncPhaseDeliverables(phaseId, deliverables);
      return await this.findOne(phaseId);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(projectId: string): Promise<Phase[]> {
    try {
      return await this.phaseRepository.find({
        where: { project: { id: projectId } },
        relations: ['deliverables', 'mentors', 'mentors.owner']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.phaseRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
