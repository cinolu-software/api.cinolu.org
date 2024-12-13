import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProgramDto } from '../dto/create-program.dto';
import { UpdateProgramDto } from '../dto/update-program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from '../entities/program.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';
import { QueryParams } from '../utils/query-params.type';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>
  ) {}

  async create(dto: CreateProgramDto): Promise<{ data: Program }> {
    try {
      await this.throwIfExist(dto.name);
      const data = await this.programRepository.save({
        ...dto,
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

  async findAll(): Promise<{ data: { programs: Program[]; count: number } }> {
    const query = this.programRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.types', 'types')
      .leftJoinAndSelect('p.categories', 'categories')
      .orderBy('p.started_at', 'DESC');
    const programs = await query.getMany();
    const count = await query.getCount();
    return { data: { programs, count } };
  }

  async findPublished(queryParams: QueryParams): Promise<{ data: { programs: Program[]; count: number } }> {
    const { page, type, category, hideFinished } = queryParams;
    const query = this.programRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.types', 'types')
      .leftJoinAndSelect('p.categories', 'categories')
      .andWhere('p.is_published = :isPublished', { isPublished: true });
    if (type) query.andWhere('types.name = :type', { type });
    if (category) query.andWhere('categories.name = :category', { category });
    if (hideFinished) query.andWhere('p.ended_at > :now', { now: new Date() });
    const take: number = 9;
    const skip = ((page || 1) - 1) * take;
    const programs: Program[] = await query.skip(skip).take(take).orderBy('p.started_at', 'DESC').getMany();
    const count = await query.getCount();
    return { data: { programs, count } };
  }

  async findRecent(): Promise<{ data: Program[] }> {
    try {
      const data = await this.programRepository.find({
        order: { ended_at: 'DESC' },
        where: { is_published: true },
        take: 3
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la récupération du dernier événement');
    }
  }

  async addImage(id: string, file: Express.Multer.File): Promise<{ data: Program }> {
    try {
      const { data: program } = await this.findOne(id);
      if (program.image) await fs.unlink(`./uploads/programs/${program.image}`);
      const data = await this.programRepository.save({ ...program, image: file.filename });
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la mise à jour de l'image");
    }
  }

  async findOne(id: string): Promise<{ data: Program }> {
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

  async publish(id: string): Promise<{ data: Program }> {
    try {
      await this.programRepository.update(id, { is_published: true });
      const { data } = await this.findOne(id);
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de la publication de l'événement");
    }
  }

  async update(id: string, dto: UpdateProgramDto): Promise<{ data: Program }> {
    try {
      const { data: program } = await this.findOne(id);
      const data = await this.programRepository.save({
        id,
        ...dto,
        categories: dto.categories.map((category) => ({ id: category })) || program.categories,
        types: dto?.types.map((type) => ({ id: type })) || program.types,
        partners: dto?.partners.map((id) => ({ id })) || program.partners
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la modification du programme');
    }
  }

  async restore(id: string): Promise<{ data: Program }> {
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
