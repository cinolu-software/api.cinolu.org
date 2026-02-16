import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { MoveParticipantsDto } from './dto/move-participants.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Phase } from './entities/phase.entity';
import { ProjectParticipation } from '@/modules/projects/entities/participation.entity';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>,
    @InjectRepository(ProjectParticipation)
    private readonly participationRepository: Repository<ProjectParticipation>
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
        relations: ['participations', 'participations.user']
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
      where: { project: { id: projectId } }
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

  async moveParticipants(dto: MoveParticipantsDto): Promise<void> {
    try {
      const phase = await this.phaseRepository.findOneOrFail({
        where: { id: dto.phaseId }
      });
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
    } catch {
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
