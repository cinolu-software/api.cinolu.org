import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phase } from './entities/phase.entity';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase)
    private phaseRepository: Repository<Phase>
  ) {}

  async create(dto: CreatePhaseDto): Promise<Phase> {
    try {
      const phase = this.phaseRepository.create({
        ...dto,
        project: { id: dto.project }
      });
      return await this.phaseRepository.save(phase);
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Phase> {
    try {
      return await this.phaseRepository.findOneOrFail({
        where: { id },
        relations: ['project', 'resources']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByProject(projectId: string): Promise<Phase[]> {
    try {
      return await this.phaseRepository.find({
        where: { project: { id: projectId } },
        relations: ['resources'],
        order: { order: 'ASC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdatePhaseDto): Promise<Phase> {
    try {
      const phase = await this.findOne(id);
      const updateData: Record<string, unknown> = { ...dto };
      if (dto.project) updateData.project = { id: dto.project };
      Object.assign(phase, updateData);
      return await this.phaseRepository.save(phase);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const phase = await this.findOne(id);
      await this.phaseRepository.softRemove(phase);
    } catch {
      throw new BadRequestException();
    }
  }
}
