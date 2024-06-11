import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>
  ) {}

  async create(dto: CreateStatusDto): Promise<{ data: Status }> {
    try {
      const data: Status = await this.statusRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue lors de la création du status');
    }
  }

  async findAll(): Promise<{ data: Status[] }> {
    const data = await this.statusRepository.find();
    return { data };
  }

  async findOne(id: number): Promise<{ data: Status }> {
    try {
      const data = await this.statusRepository.findOneOrFail({ where: { id } });
      return { data };
    } catch {
      throw new BadRequestException('Status non trouvé');
    }
  }

  async update(id: number, dto: UpdateStatusDto): Promise<{ data: Status }> {
    const { data: status } = await this.findOne(id);
    try {
      const newData = { ...status, ...dto };
      const data = await this.statusRepository.save(newData);
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue lors de la modification du status');
    }
  }

  async remove(id: number): Promise<void> {
    const { data: status } = await this.findOne(id);
    try {
      await this.statusRepository.remove(status);
    } catch {
      throw new BadRequestException('Une erreur est survenue lors de la suppression du status');
    }
  }
}
