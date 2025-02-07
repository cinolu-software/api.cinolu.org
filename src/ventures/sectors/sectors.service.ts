import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSectorDto } from '../dto/create-sector.dto';
import { UpdateSectorDto } from '../dto/update-sector.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private sectorRepository: Repository<Sector>
  ) {}

  async create(dto: CreateSectorDto): Promise<Sector> {
    try {
      return await this.sectorRepository.save(dto);
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findAll(): Promise<Sector[]> {
    return await this.sectorRepository.find();
  }

  async findOne(id: string): Promise<Sector> {
    try {
      return await this.sectorRepository.findOneOrFail({
        where: { id }
      });
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async update(id: string, dto: UpdateSectorDto): Promise<Sector> {
    try {
      const sector = await this.findOne(id);
      await this.sectorRepository.save({ ...sector, ...dto });
      return await this.findOne(id);
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
