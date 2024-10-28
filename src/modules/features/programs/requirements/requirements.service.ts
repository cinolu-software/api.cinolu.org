import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Requirement } from './entities/requirement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RequirementsService {
  constructor(
    @InjectRepository(Requirement)
    private readonly requirementRepository: Repository<Requirement>
  ) {}

  async create(dto: CreateRequirementDto): Promise<{ data: Requirement }> {
    try {
      const data: Requirement = await this.requirementRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la création de la condition');
    }
  }

  async createMany(dto: CreateRequirementDto[]): Promise<{ data: Requirement[] }> {
    try {
      const data: Requirement[] = await this.requirementRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la création des conditions');
    }
  }

  async findAll(): Promise<{ data: Requirement[] }> {
    const data = await this.requirementRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: Requirement }> {
    try {
      const data = await this.requirementRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new NotFoundException('Erreur lors de la récupération de la condition');
    }
  }

  async update(id: string, dto: UpdateRequirementDto) {
    try {
      const { data: requirement } = await this.findOne(id);
      const newRequirement: Requirement & UpdateRequirementDto = Object.assign(requirement, dto);
      const data = await this.requirementRepository.save(newRequirement);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour de la condition');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.requirementRepository.delete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression de la condition');
    }
  }
}
