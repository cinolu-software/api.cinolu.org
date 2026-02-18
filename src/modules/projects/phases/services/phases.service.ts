import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhaseDto } from '../dto/create-phase.dto';
import { UpdatePhaseDto } from '../dto/update-phase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phase } from '../entities/phase.entity';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>
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
    try {
      return await this.phaseRepository.find({
        where: { project: { id: projectId } },
        relations: ['deliverables']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(phaseId: string): Promise<void> {
    try {
      const phase = await this.phaseRepository.findOneOrFail({ where: { id: phaseId } });
      await this.phaseRepository.softDelete(phase.id);
    } catch {
      throw new BadRequestException();
    }
  }
}
