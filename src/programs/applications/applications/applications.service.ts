import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplicationDto, UpdateApplicationDto } from './dto';
import { Application } from './entities/application.entity';
import { User } from '../../../shared/modules/users/users/entities/user.entity';

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
        program: { id: dto.program },
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

  async findOne(id: string): Promise<{ data: Application }> {
    try {
      const data = await this.applicationRepository.findOneOrFail({
        where: { id },
        relations: ['program', 'applicant']
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
        program: application.program,
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
