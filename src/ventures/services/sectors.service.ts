import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSectorDto } from '../dto/create-sector.dto';
import { UpdateSectorDto } from '../dto/update-sector.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sector } from '../entities/sectors.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private sectorRepository: Repository<Sector>
  ) {}

  async create(dto: CreateSectorDto): Promise<{ data: Sector }> {
    try {
      const data = await this.sectorRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findAll(): Promise<{ data: Sector[] }> {
    const data = await this.sectorRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: Sector }> {
    try {
      const data = await this.sectorRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async update(id: string, dto: UpdateSectorDto): Promise<{ data: Sector }> {
    try {
      const { data: sector } = await this.findOne(id);
      await this.sectorRepository.save({ ...sector, ...dto });
      const { data } = await this.findOne(id);
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.sectorRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }
}
