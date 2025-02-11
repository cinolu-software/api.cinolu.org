import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';
import { QueryParams } from './utils/query-params.type';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    try {
      await this.throwIfExist(dto.name);
      return await this.projectRepository.save({
        ...dto,
        program: { id: dto.program },
        categories: dto.categories.map((category) => ({ id: category })),
        types: dto.types.map((type) => ({ id: type })),
        partners: dto.partners.map((id) => ({ id }))
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async throwIfExist(name: string): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { name }
    });
    if (project) throw new BadRequestException();
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ['types', 'partners', 'categories']
    });
  }

  async findPublished(queryParams: QueryParams): Promise<[Project[], number]> {
    const { page = 1, type } = queryParams;
    const take = 9;
    const skip = (page - 1) * take;
    const where = { is_published: true };
    if (type) where['types'] = { name: type };
    return await this.projectRepository.findAndCount({
      where,
      relations: ['types', 'categories'],
      take,
      skip,
      order: { started_at: 'DESC' }
    });
  }

  async findRecent(): Promise<Project[]> {
    try {
      return await this.projectRepository.find({
        order: { ended_at: 'DESC' },
        relations: ['types'],
        where: { is_published: true },
        take: 5
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addImage(id: string, file: Express.Multer.File): Promise<Project> {
    try {
      const project = await this.findOne(id);
      if (project.image) await fs.unlink(`./uploads/projects/${project.image}`);
      return await this.projectRepository.save({ ...project, image: file.filename });
    } catch {
      throw new BadRequestException();
    }
  }

  async findOne(id: string): Promise<Project> {
    try {
      return await this.projectRepository.findOneOrFail({
        where: { id },
        relations: ['types', 'partners', 'program', 'categories', 'phases', 'phases.requirements']
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async publish(id: string): Promise<Project> {
    try {
      const project = await this.findOne(id);
      await this.projectRepository.update(id, { is_published: !project.is_published });
      return project;
    } catch {
      throw new BadRequestException();
    }
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    try {
      const project = await this.findOne(id);
      return await this.projectRepository.save({
        id,
        ...dto,
        program: { id: dto?.program ?? project.program.id },
        categories: dto.categories.map((category) => ({ id: category })) ?? project.categories,
        types: dto?.types.map((type) => ({ id: type })) ?? project.types,
        partners: dto?.partners.map((id) => ({ id })) ?? project.partners
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.projectRepository.softDelete(id);
    } catch {
      throw new BadRequestException();
    }
  }
}
