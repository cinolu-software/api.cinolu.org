import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { User } from '../../../users/entities/user.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>
  ) {}

  async create(user: User, dto: CreateApplicationDto): Promise<{ data: Application }> {
    try {
      const data = await this.applicationRepository.save({
        ...dto,
        project: { id: dto.project },
        applicant: user
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la création du type');
    }
  }

  async findAll(): Promise<{ data: Application[] }> {
    const data = await this.applicationRepository.find();
    return { data };
  }

  async findByProject(project: string): Promise<{ data: Application[] }> {
    const data = await this.applicationRepository.find({
      where: { project: { id: project } },
      relations: ['project', 'applicant']
    });
    return { data };
  }

  async findOne(id: string): Promise<{ data: Application }> {
    try {
      const data = await this.applicationRepository.findOneOrFail({
        where: { id },
        relations: ['project', 'applicant']
      });
      return { data };
    } catch {
      throw new NotFoundException('Impossible de récupérer le type');
    }
  }

  async update(id: string, dto: UpdateApplicationDto): Promise<{ data: Application }> {
    try {
      const { data: application } = await this.findOne(id);
      const data = await this.applicationRepository.save({
        ...application,
        ...dto,
        project: application.project,
        applicant: application.applicant
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur survenue lors de la modification du type');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.applicationRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Impossible de supprimer le type');
    }
  }
}
