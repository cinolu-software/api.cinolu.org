import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhaseDeliverable } from '../entities/deliverable.entity';
import { CreateDeliverableDto } from '../dto/create-deliverable.dto';
import { UpdateDeliverableDto } from '../dto/update-deliverable.dto';
import { DelivrableParams } from '../types/deliverables.types';

@Injectable()
export class PhaseDeliverablesService {
  constructor(
    @InjectRepository(PhaseDeliverable)
    private readonly deliverableRepository: Repository<PhaseDeliverable>
  ) {}

  async create(phaseId: string, dto: CreateDeliverableDto): Promise<PhaseDeliverable> {
    try {
      return await this.deliverableRepository.save({
        ...dto,
        phase: { id: phaseId }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(params: DelivrableParams): Promise<PhaseDeliverable> {
    try {
      const { phaseId, delivrableId } = params;
      return await this.deliverableRepository.findOneOrFail({
        where: { id: delivrableId, phase: { id: phaseId } }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(params: DelivrableParams, dto: UpdateDeliverableDto): Promise<PhaseDeliverable> {
    try {
      const deliverable = await this.findOne(params);
      return await this.deliverableRepository.save({ ...deliverable, ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(params: DelivrableParams): Promise<void> {
    try {
      await this.findOne(params);
      await this.deliverableRepository.softDelete(params.phaseId);
    } catch {
      throw new BadRequestException();
    }
  }
}
