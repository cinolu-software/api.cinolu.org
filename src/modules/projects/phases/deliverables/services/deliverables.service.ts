import { BadRequestException, Injectable } from '@nestjs/common';
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

  async createMany(phaseId: string, dto: DeliverableDto[]): Promise<Deliverable[]> {
    try {
      return await this.deliverableRepository.save(
        dto.map((dto) => ({
          title: dto.title,
          description: dto.description,
          phase: { id: phaseId }
        }))
      );
    } catch {
      throw new BadRequestException();
    }
  }

  async syncPhaseDeliverables(phaseId: string, dto: DeliverableDto[]): Promise<void> {
    try {
      const current = await this.findByPhaseId(phaseId);
      const currentById = this.mapById(current);
      const incomingWithId = this.getIncomingWithId(dto);
      this.ensureIncomingIdsExist(incomingWithId, currentById);
      await this.updateChangedDeliverables(incomingWithId, currentById);
      await this.removeMissingDeliverables(current, incomingWithId);
      await this.createNewDeliverables(phaseId, dto);
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

  private ensureIncomingIdsExist(dto: DeliverableDto[], currentById: Map<string, Deliverable>): void {
    const hasInvalidId = dto.some((dto) => !currentById.has(dto.id as string));
    if (hasInvalidId) throw new BadRequestException();
  }

  private async updateChangedDeliverables(dto: DeliverableDto[], currentById: Map<string, Deliverable>): Promise<void> {
    for (const d of dto) {
      const existing = currentById.get(d.id as string);
      if (!existing) continue;
      if (!this.hasChanges(existing, d)) continue;
      await this.deliverableRepository.save(this.buildUpdatedDeliverable(existing, d));
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
    const ids = new Set(dto.map((dto) => dto.id as string));
    const toDeleteIds = current.filter((deliverable) => !ids.has(deliverable.id)).map((deliverable) => deliverable.id);
    if (!toDeleteIds.length) return;
    await this.deliverableRepository.softDelete(toDeleteIds);
  }

  private async createNewDeliverables(phaseId: string, dto: DeliverableDto[]): Promise<void> {
    const toCreate = dto.filter((d) => !d.id);
    if (!toCreate.length) return;
    await this.createMany(phaseId, toCreate);
  }
}
