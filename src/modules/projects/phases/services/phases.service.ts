import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhaseDto } from '../dto/create-phase.dto';
import { UpdatePhaseDto } from '../dto/update-phase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phase } from '../entities/phase.entity';
import { DeliverablesService } from '../deliverables/services/deliverables.service';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>,
    private readonly deliverablesService: DeliverablesService
  ) {}

  async create(projectId: string, dto: CreatePhaseDto): Promise<Phase> {
    try {
      const { deliverables, ...phaseData } = dto;
      const phase = await this.phaseRepository.save({
        ...phaseData,
        project: { id: projectId }
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
        relations: ['participations', 'participations.user', 'deliverables']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(phaseId: string, updatePhaseDto: UpdatePhaseDto): Promise<Phase> {
    try {
      const { deliverables, ...phaseData } = updatePhaseDto;
      await this.phaseRepository.update(phaseId, phaseData);
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
        relations: ['deliverables']
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
