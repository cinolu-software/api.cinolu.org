import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpertiseDto } from './dto/create-expertise.dto';
import { UpdateExpertiseDto } from './dto/update-expertise.dto';
import { Expertise } from './entities/expertise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpertisesService {
  constructor(
    @InjectRepository(Expertise)
    private expertiseRepository: Repository<Expertise>
  ) {}

  async create(dto: CreateExpertiseDto): Promise<Expertise> {
    try {
      const expertise = await this.expertiseRepository.save({ ...dto });
      return expertise;
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findAll(): Promise<Expertise[]> {
    return await this.expertiseRepository.find();
  }

  async findOne(id: string): Promise<Expertise> {
    try {
      const expertise = await this.expertiseRepository.findOneOrFail({
        where: { id }
      });
      return expertise;
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async update(id: string, dto: UpdateExpertiseDto): Promise<Expertise> {
    try {
      const expertise = await this.findOne(id);
      return await this.expertiseRepository.save({ ...expertise, ...dto });
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.expertiseRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }
}
