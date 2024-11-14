import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Requirement } from './entities/requirement.entity';
import { CreateRequirementDto, UpdateRequirementDto } from './dto';

@Injectable()
export class RequirementsService {
  constructor(
    @InjectRepository(Requirement)
    private requirementRepository: Repository<Requirement>
  ) {}

  async findAll(): Promise<{ data: Requirement[] }> {
    const data = await this.requirementRepository.find();
    return { data };
  }

  async create(dto: CreateRequirementDto): Promise<{ data: Requirement }> {
    try {
      const data = await this.requirementRepository.save({
        ...dto,
        phase: { id: dto.phase }
      });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout du document");
    }
  }

  async findOne(id: string): Promise<Requirement> {
    try {
      const document = await this.requirementRepository.findOneOrFail({ where: { id } });
      return document;
    } catch {
      throw new BadRequestException('Erreur lors de la lecture du prérecquis');
    }
  }

  async update(id: string, dto: UpdateRequirementDto): Promise<{ data: Requirement }> {
    try {
      const document = await this.findOne(id);
      const data = await this.requirementRepository.save({
        ...document,
        ...dto,
        phase: dto.phase ? { id: dto.phase } : document.phase
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du prérecquis');
    }
  }

  async restore(id: string): Promise<{ data: Requirement }> {
    try {
      const res = await this.requirementRepository.restore(id);
      if (!res.affected) throw new BadRequestException();
      const data = await this.findOne(id);
      return { data };
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
