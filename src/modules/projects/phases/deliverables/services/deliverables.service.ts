import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliverableDto } from '@/modules/projects/phases/deliverables/dto/deliverable.dto';
import { Deliverable } from '../entities/deliverable.entity';

@Injectable()
export class DeliverablesService {
  constructor(
    @InjectRepository(Deliverable)
    private readonly deliverableRepository: Repository<Deliverable>
  ) {}

  async createMany(phaseId: string, dtos: DeliverableDto[]): Promise<Deliverable[]> {
    try {
      return await this.deliverableRepository.save(
        dtos.map((dto) => ({
          title: dto.title,
          description: dto.description,
          phase: { id: phaseId }
        }))
      );
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Deliverable> {
    try {
      return await this.deliverableRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async syncPhaseDeliverables(phaseId: string, DTOs: DeliverableDto[]): Promise<void> {
    try {
      const current = await this.findByPhaseId(phaseId);
      const currentById = this.mapById(current);
      const incomingWithId = this.getIncomingWithId(DTOs);
      this.ensureIncomingIdsExist(incomingWithId, currentById);
      await this.updateChangedDeliverables(incomingWithId, currentById);
      await this.removeMissingDeliverables(current, incomingWithId);
      await this.createNewDeliverables(phaseId, DTOs);
    } catch {
      throw new BadRequestException();
    }
  }

  private async findByPhaseId(phaseId: string): Promise<Deliverable[]> {
    return await this.deliverableRepository.find({
      where: { phase: { id: phaseId } }
    });
  }

  private mapById(deliverables: Deliverable[]): Map<string, Deliverable> {
    return new Map(deliverables.map((deliverable) => [deliverable.id, deliverable]));
  }

  private getIncomingWithId(incoming: DeliverableDto[]): DeliverableDto[] {
    return incoming.filter((dto) => dto.id);
  }

  private ensureIncomingIdsExist(DTOs: DeliverableDto[], currentById: Map<string, Deliverable>): void {
    const hasInvalidId = DTOs.some((dto) => !currentById.has(dto.id as string));
    if (hasInvalidId) throw new BadRequestException();
  }

  private async updateChangedDeliverables(
    DTOs: DeliverableDto[],
    currentById: Map<string, Deliverable>
  ): Promise<void> {
    for (const dto of DTOs) {
      const existing = currentById.get(dto.id as string);
      if (!existing) continue;
      if (!this.hasChanges(existing, dto)) continue;
      await this.deliverableRepository.save(this.buildUpdatedDeliverable(existing, dto));
    }
  }

  private hasChanges(existing: Deliverable, dto: DeliverableDto): boolean {
    return existing.title !== dto.title || (existing.description ?? null) !== (dto.description ?? null);
  }

  private buildUpdatedDeliverable(existing: Deliverable, dto: DeliverableDto): Deliverable {
    return {
      ...existing,
      title: dto.title,
      description: dto.description
    };
  }

  private async removeMissingDeliverables(current: Deliverable[], dto: DeliverableDto[]): Promise<void> {
    const incomingIds = new Set(dto.map((dto) => dto.id as string));
    const toDeleteIds = current
      .filter((deliverable) => !incomingIds.has(deliverable.id))
      .map((deliverable) => deliverable.id);
    if (!toDeleteIds.length) return;
    await this.deliverableRepository.softDelete(toDeleteIds);
  }

  private async createNewDeliverables(phaseId: string, incoming: DeliverableDto[]): Promise<void> {
    const toCreate = incoming.filter((dto) => !dto.id);
    if (!toCreate.length) return;
    await this.createMany(phaseId, toCreate);
  }
}
