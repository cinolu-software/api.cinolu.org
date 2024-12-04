import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CallApplication } from '../entities/application.entity';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(CallApplication)
    private applicationRepository: Repository<CallApplication>
  ) {}

  async create(user: User, dto: CreateApplicationDto): Promise<{ data: CallApplication }> {
    try {
      const data = await this.applicationRepository.save({
        ...dto,
        applicant: user
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async findAll(): Promise<{ data: CallApplication[] }> {
    const data = await this.applicationRepository.find();
    return { data };
  }

  async findOne(id: string): Promise<{ data: CallApplication }> {
    try {
      const data = await this.applicationRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async update(id: string, dto: UpdateApplicationDto): Promise<{ data: CallApplication }> {
    try {
      const { data: application } = await this.findOne(id);
      await this.applicationRepository.save({ ...application, ...dto });
      const { data } = await this.findOne(id);
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.applicationRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Une erreur est survenue sur le serveur');
    }
  }
}
