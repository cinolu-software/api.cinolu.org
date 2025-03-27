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

  async create(user: User, dto: CreateApplicationDto): Promise<Application> {
    try {
      return await this.applicationRepository.save({
        ...dto,
        project: { id: dto.project },
        applicant: user
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Application[]> {
    return await this.applicationRepository.find();
  }

  async findByProject(project: string): Promise<Application[]> {
    return await this.applicationRepository.find({
      where: { project: { id: project } },
      relations: ['project', 'applicant']
    });
  }

  async findOne(id: string): Promise<Application> {
    try {
      return await this.applicationRepository.findOneOrFail({
        where: { id },
        relations: ['project', 'applicant']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async update(id: string, dto: UpdateApplicationDto): Promise<Application> {
    try {
      const application = await this.findOne(id);
      return await this.applicationRepository.save({
        ...application,
        ...dto,
        project: application.project,
        applicant: application.applicant
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.applicationRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
