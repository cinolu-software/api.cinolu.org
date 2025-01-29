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

  async create(dto: CreateProjectDto): Promise<{ data: Project }> {
    try {
      await this.throwIfExist(dto.name);
      const data = await this.projectRepository.save({
        ...dto,
        program: { id: dto.program },
        categories: dto.categories.map((category) => ({ id: category })),
        types: dto.types.map((type) => ({ id: type })),
        partners: dto.partners.map((id) => ({ id }))
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la création du projectme');
    }
  }

  async throwIfExist(name: string): Promise<void> {
    const project = await this.projectRepository.findOne({
      where: { name }
    });
    if (project) throw new BadRequestException('Le projectme existe déjà');
  }

  async findAll(): Promise<{ data: Project[] }> {
    const data = await this.projectRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.types', 'types')
      .leftJoinAndSelect('p.partners', 'partners')
      .leftJoinAndSelect('p.categories', 'categories')
      .orderBy('p.started_at', 'DESC')
      .getMany();
    return { data };
  }

  async findPublished(queryParams: QueryParams): Promise<{ data: [Project[], number] }> {
    const { page = 1, type } = queryParams;
    const take = 9;
    const skip = (page - 1) * take;
    const where = { is_published: true };
    if (type) where['types'] = { name: type };
    const data = await this.projectRepository.findAndCount({
      where,
      relations: ['types', 'categories'],
      take,
      skip,
      order: { started_at: 'DESC' }
    });
    return { data };
  }

  async findRecent(): Promise<{ data: Project[] }> {
    try {
      const data = await this.projectRepository.find({
        order: { ended_at: 'DESC' },
        relations: ['types'],
        where: { is_published: true },
        take: 5
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la récupération du dernier événement');
    }
  }

  async addImage(id: string, file: Express.Multer.File): Promise<{ data: Project }> {
    try {
      const { data: project } = await this.findOne(id);
      if (project.image) await fs.unlink(`./uploads/projects/${project.image}`);
      const data = await this.projectRepository.save({ ...project, image: file.filename });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la mise à jour de l'image");
    }
  }

  async findOne(id: string): Promise<{ data: Project }> {
    try {
      const data = await this.projectRepository.findOneOrFail({
        where: { id },
        relations: ['types', 'partners', 'categories', 'phases', 'phases.requirements']
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la récupération du projectme');
    }
  }

  async publish(id: string): Promise<{ data: Project }> {
    try {
      const { data } = await this.findOne(id);
      await this.projectRepository.update(id, { is_published: !data.is_published });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la publication de l'événement");
    }
  }

  async update(id: string, dto: UpdateProjectDto): Promise<{ data: Project }> {
    try {
      const { data: project } = await this.findOne(id);
      const data = await this.projectRepository.save({
        id,
        ...dto,
        program: { id: dto.program },
        categories: dto.categories.map((category) => ({ id: category })) || project.categories,
        types: dto?.types.map((type) => ({ id: type })) || project.types,
        partners: dto?.partners.map((id) => ({ id })) || project.partners
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la modification du projectme');
    }
  }

  async restore(id: string): Promise<{ data: Project }> {
    try {
      const res = await this.projectRepository.restore(id);
      if (!res.affected) throw new BadRequestException();
      const { data } = await this.findOne(id);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la restauration du projectme');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.projectRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression du projectme');
    }
  }
}
