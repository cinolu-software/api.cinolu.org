import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhaseDeliverable } from '../entities/deliverable.entity';
import { CreateDeliverableDto } from '../dto/create-deliverable.dto';
import { UpdateDeliverableDto } from '../dto/update-deliverable.dto';
import { PhasesService } from '@/modules/projects/phases/services/phases.service';

@Injectable()
export class PhaseDeliverablesService {
  constructor(
    @InjectRepository(PhaseDeliverable)
    private readonly deliverableRepository: Repository<PhaseDeliverable>,
    private readonly phasesService: PhasesService
  ) {}

  async create(phaseId: string, dto: CreateDeliverableDto): Promise<PhaseDeliverable> {
    try {
      await this.phasesService.findOne(phaseId);
      return await this.deliverableRepository.save({
        ...dto,
        phase: { id: phaseId }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(phaseId: string, id: string): Promise<PhaseDeliverable> {
    try {
      return await this.deliverableRepository.findOneOrFail({
        where: { id, phase: { id: phaseId } }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(phaseId: string, id: string, dto: UpdateDeliverableDto): Promise<PhaseDeliverable> {
    try {
      const deliverable = await this.findOne(phaseId, id);
      return await this.deliverableRepository.save({ ...deliverable, ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(phaseId: string, id: string): Promise<void> {
    try {
      await this.findOne(phaseId, id);
      await this.deliverableRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
