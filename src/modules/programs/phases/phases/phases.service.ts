import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phase } from './entities/phase.entity';
import { CreatePhaseDto, UpdatePhaseDto } from './dto';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase)
    private phaseRepository: Repository<Phase>
  ) {}

  async create(dto: CreatePhaseDto): Promise<{ data: Phase }> {
    try {
      const data = await this.phaseRepository.save({
        ...dto,
        program: { id: dto.program }
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la soumission de la phase');
    }
  }

  async findAll(): Promise<{ data: Phase[] }> {
    const data = await this.phaseRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: Phase }> {
    try {
      const data = await this.phaseRepository.findOneOrFail({
        where: { id },
        relations: ['documents', 'program', 'requirements']
      });
      return { data };
    } catch {
      throw new NotFoundException('Impossible de récupérer la phase');
    }
  }

  async update(id: string, dto: UpdatePhaseDto): Promise<{ data: Phase }> {
    try {
      const { data: phase } = await this.findOne(id);
      const data = await this.phaseRepository.save({
        ...phase,
        ...dto,
        program: phase.program
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la modification de la phase');
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
