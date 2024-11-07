import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { ProgramType } from './entities/type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(ProgramType)
    private typeRepository: Repository<ProgramType>
  ) {}

  async create(dto: CreateTypeDto): Promise<{ data: ProgramType }> {
    try {
      const data = await this.typeRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la création du type');
    }
  }

  async findAll(): Promise<{ data: ProgramType[] }> {
    const data = await this.typeRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: ProgramType }> {
    try {
      const data = await this.typeRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new NotFoundException('Impossible de récupérer le type');
    }
  }

  async update(id: string, dto: UpdateTypeDto): Promise<{ data: ProgramType }> {
    try {
      const { data: type } = await this.findOne(id);
      const data = await this.typeRepository.save({ ...type, ...dto });
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la modification du type');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.typeRepository.delete(id);
    } catch {
      throw new BadRequestException('Impossible de supprimer le type');
    }
  }
}
