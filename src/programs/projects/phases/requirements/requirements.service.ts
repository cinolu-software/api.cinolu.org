import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Requirement } from './entities/requirement.entity';
import { CreateRequirementDto } from '../dto/create-requirement.dto';
import { UpdateRequirementDto } from '../dto/update-requirement.dto';

@Injectable()
export class RequirementsService {
  constructor(
    @InjectRepository(Requirement)
    private requirementRepository: Repository<Requirement>
  ) {}

  async findAll(): Promise<Requirement[]> {
    return await this.requirementRepository.find();
  }

  async create(dto: CreateRequirementDto): Promise<Requirement[]> {
    try {
      return await Promise.all(
        dto.requirements.map(
          async (d) =>
            await this.requirementRepository.save({
              ...d,
              phase: { id: dto.phase }
            })
        )
      );
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout du prérecquis");
    }
  }

  async findOne(id: string): Promise<Requirement> {
    try {
      const requirment = await this.requirementRepository.findOneOrFail({ where: { id } });
      return requirment;
    } catch {
      throw new BadRequestException('Erreur lors de la lecture du prérecquis');
    }
  }

  async update(id: string, dto: UpdateRequirementDto): Promise<Requirement> {
    try {
      const requirment = await this.findOne(id);
      return await this.requirementRepository.save({
        ...requirment,
        ...dto,
        phase: requirment.phase
      });
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du prérecquis');
    }
  }

  async restore(id: string): Promise<Requirement> {
    try {
      const res = await this.requirementRepository.restore(id);
      if (!res.affected) throw new BadRequestException();
      return await this.findOne(id);
    } catch {
      throw new BadRequestException('Erreur lors de la restauration du prérecquis');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.requirementRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Erreur survenue lors de la suppression du prérecquis');
    }
  }
}
