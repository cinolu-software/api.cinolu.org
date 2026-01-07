import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhaseForm } from './entities/form.entity';
import { CreatePhaseFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(PhaseForm)
    private phaseFormRepository: Repository<PhaseForm>
  ) {}

  async create(dto: CreatePhaseFormDto): Promise<PhaseForm> {
    try {
      const phaseForm = this.phaseFormRepository.create({
        ...dto,
        phase: { id: dto.phase }
      });
      return await this.phaseFormRepository.save(phaseForm);
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<PhaseForm> {
    try {
      return await this.phaseFormRepository.findOneOrFail({
        where: { id },
        relations: ['phase']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findByPhase(phaseId: string): Promise<PhaseForm[]> {
    try {
      return await this.phaseFormRepository.find({
        where: { phase: { id: phaseId } },
        order: { created_at: 'ASC' }
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateFormDto): Promise<PhaseForm> {
    try {
      const phaseForm = await this.findOne(id);
      const updateData: Record<string, unknown> = { ...dto };
      if (dto.phase) updateData.phase = { id: dto.phase };
      Object.assign(phaseForm, updateData);
      return await this.phaseFormRepository.save(phaseForm);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const phaseForm = await this.findOne(id);
      await this.phaseFormRepository.softRemove(phaseForm);
    } catch {
      throw new BadRequestException();
    }
  }
}
