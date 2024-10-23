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
    private expertisesRepository: Repository<Expertise>
  ) {}

  async create(dto: CreateExpertiseDto): Promise<{ data: Expertise }> {
    try {
      const data = await this.expertisesRepository.save({ ...dto });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findAll(): Promise<{ data: Expertise[] }> {
    const data = await this.expertisesRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: Expertise }> {
    try {
      const data = await this.expertisesRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async update(id: string, dto: UpdateExpertiseDto): Promise<{ data: Expertise }> {
    try {
      const { data: expertise } = await this.findOne(id);
      const data = await this.expertisesRepository.save({ ...expertise, ...dto });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.expertisesRepository.delete(id);
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }
}
