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

  async findOne(id: string): Promise<Phase> {
    try {
      return await this.phaseRepository.findOneOrFail({
        where: { id },
        relations: ['participations', 'participations.user']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, updatePhaseDto: UpdatePhaseDto): Promise<Phase> {
    try {
      await this.phaseRepository.update(id, updatePhaseDto);
      return await this.findOne(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(id: string): Promise<Phase[]> {
    return await this.phaseRepository.find({
      where: { project: { id } }
    });
  }

  async remove(id: string): Promise<void> {
    try {
      const phase = await this.phaseRepository.findOneOrFail({ where: { id } });
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
        relations: ['phase']
      });
      for (const p of participations) {
        const alreadyInPhase = p.phase?.some((ph) => ph.id === phase.id);
        if (alreadyInPhase) continue;
        p.phase = [...(p.phase ?? []), phase];
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
        relations: ['phase']
      });
      for (const p of participations) {
        p.phase = (p.phase ?? []).filter((ph) => ph.id !== dto.phaseId);
        await this.participationRepository.save(p);
      }
    } catch {
      throw new BadRequestException();
    }
  }
}
