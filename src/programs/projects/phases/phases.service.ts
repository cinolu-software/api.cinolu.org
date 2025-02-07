import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
      return await this.phaseRepository.save({
        ...dto,
        project: { id: dto.project }
      });
    } catch {
      throw new BadRequestException('Erreur survenue lors de la soumission de la phase');
    }
  }

  async findByProject(id: string): Promise<Phase[]> {
    try {
      return await this.phaseRepository.find({
        where: { project: { id } }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Phase[]> {
    return await this.phaseRepository.find();
  }

  async findOne(id: string): Promise<Phase> {
    try {
      return await this.phaseRepository.findOneOrFail({
        where: { id },
        relations: ['documents', 'project', 'requirements']
      });
    } catch {
      throw new NotFoundException('Impossible de récupérer la phase');
    }
  }

  async update(id: string, dto: UpdatePhaseDto): Promise<Phase> {
    try {
      const phase = await this.findOne(id);
      return await this.phaseRepository.save({
        ...phase,
        ...dto,
        project: phase.project
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.phaseRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Impossible de supprimer la phase');
    }
  }
}
