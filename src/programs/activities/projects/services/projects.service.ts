import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProgramDto } from '../dto/create-project.dto';
import { UpdateProgramDto } from '../dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';
import { QueryParams } from '../utils/query-params.type';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private programRepository: Repository<Project>
  ) {}

  async create(dto: CreateProgramDto): Promise<{ data: Project }> {
    try {
      await this.throwIfExist(dto.name);
      const data = await this.programRepository.save({
        ...dto,
        program: { id: dto.program },
        categories: dto.categories.map((category) => ({ id: category })),
        types: dto.types.map((type) => ({ id: type })),
        partners: dto.partners.map((id) => ({ id }))
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la création du programme');
    }
  }

  async throwIfExist(name: string): Promise<void> {
    const program = await this.programRepository.findOne({
      where: { name }
    });
    if (program) throw new BadRequestException('Le programme existe déjà');
  }

  async findAll(): Promise<{ data: Project[] }> {
    const data = await this.programRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.types', 'types')
      .leftJoinAndSelect('p.partners', 'partners')
      .leftJoinAndSelect('p.categories', 'categories')
      .orderBy('p.started_at', 'DESC')
      .getMany();
    return { data };
  }

  async findPublished(queryParams: QueryParams): Promise<{ data: { projects: Project[]; count: number } }> {
    const { page, type } = queryParams;
    const query = this.programRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.types', 'types')
      .leftJoinAndSelect('p.categories', 'categories')
      .andWhere('p.is_published = :isPublished', { isPublished: true });
    if (type) query.andWhere('types.name = :type', { type });
    const take: number = 9;
    const skip = ((page || 1) - 1) * take;
    const projects: Project[] = await query.skip(skip).take(take).orderBy('p.started_at', 'DESC').getMany();
    const count = await query.getCount();
    return { data: { projects, count } };
  }

  async findRecent(): Promise<{ data: Project[] }> {
    try {
      const data = await this.programRepository.find({
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
      const { data: program } = await this.findOne(id);
      if (program.image) await fs.unlink(`./uploads/programs/${program.image}`);
      const data = await this.programRepository.save({ ...program, image: file.filename });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la mise à jour de l'image");
    }
  }

  async findOne(id: string): Promise<{ data: Project }> {
    try {
      const data = await this.programRepository.findOneOrFail({
        where: { id },
        relations: ['types', 'partners', 'categories', 'phases', 'phases.requirements']
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la récupération du programme');
    }
  }

  async publish(id: string): Promise<{ data: Project }> {
    try {
      const { data } = await this.findOne(id);
      await this.programRepository.update(id, { is_published: !data.is_published });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la publication de l'événement");
    }
  }

  async update(id: string, dto: UpdateProgramDto): Promise<{ data: Project }> {
    try {
      const { data: program } = await this.findOne(id);
      const data = await this.programRepository.save({
        id,
        ...dto,
        program: { id: dto.program },
        categories: dto.categories.map((category) => ({ id: category })) || program.categories,
        types: dto?.types.map((type) => ({ id: type })) || program.types,
        partners: dto?.partners.map((id) => ({ id })) || program.partners
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la modification du programme');
    }
  }

  async restore(id: string): Promise<{ data: Project }> {
    try {
      const res = await this.programRepository.restore(id);
      if (!res.affected) throw new BadRequestException();
      const { data } = await this.findOne(id);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la restauration du programme');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.findOne(id);
      await this.programRepository.softDelete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression du programme');
    }
  }
}
