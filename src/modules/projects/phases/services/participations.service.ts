import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProjectParticipation } from '@/modules/projects/entities/project-participation.entity';
import { MoveParticipantsDto } from '../dto/move-participants.dto';
import { PhasesService } from './phases.service';

@Injectable()
export class PhaseParticipantsService {
  constructor(
    @InjectRepository(ProjectParticipation)
    private readonly participationRepository: Repository<ProjectParticipation>,
    private readonly phasesService: PhasesService
  ) {}

  async moveParticipants(dto: MoveParticipantsDto): Promise<void> {
    try {
      const phase = await this.phasesService.findOne(dto.phaseId);
      const participations = await this.participationRepository.find({
        where: { id: In(dto.ids) },
        relations: ['phases']
      });
      for (const participation of participations) {
        const alreadyInPhase = participation.phases?.some((entry) => entry.id === phase.id);
        if (alreadyInPhase) continue;
        participation.phases = [...(participation.phases ?? []), phase];
        await this.participationRepository.save(participation);
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
      for (const participation of participations) {
        participation.phases = (participation.phases ?? []).filter((phase) => phase.id !== dto.phaseId);
        await this.participationRepository.save(participation);
      }
    } catch {
      throw new BadRequestException();
    }
  }
}
