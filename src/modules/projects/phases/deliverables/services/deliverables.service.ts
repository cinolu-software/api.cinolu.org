import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deliverable } from '../entities/deliverable.entity';
import { CreateDeliverableDto } from '../dto/create-deliverable.dto';
import { UpdateDeliverableDto } from '../dto/update-deliverable.dto';
import { DelivrableParams } from '../types/deliverables.types';

@Injectable()
export class DeliverablesService {
  constructor(
    @InjectRepository(Deliverable)
    private readonly deliverableRepository: Repository<Deliverable>
  ) {}

  async create(phaseId: string, dto: CreateDeliverableDto): Promise<Deliverable> {
    try {
      return await this.deliverableRepository.save({
        ...dto,
        phase: { id: phaseId }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(params: DelivrableParams): Promise<Deliverable> {
    try {
      const { phaseId, deliverableId } = params;
      return await this.deliverableRepository.findOneOrFail({
        where: { id: deliverableId, phase: { id: phaseId } },
        relations: ['phase', 'phase.project']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(params: DelivrableParams, dto: UpdateDeliverableDto): Promise<Deliverable> {
    try {
      const deliverable = await this.findOne(params);
      return await this.deliverableRepository.save({ ...deliverable, ...dto });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(params: DelivrableParams): Promise<void> {
    try {
      const deliverable = await this.findOne(params);
      await this.deliverableRepository.softDelete(deliverable.id);
    } catch {
      throw new BadRequestException();
    }
  }
}
