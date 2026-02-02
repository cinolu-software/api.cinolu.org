import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { Readable } from 'stream';
import { parse } from 'fast-csv';
import { Project } from './entities/project.entity';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Phase } from './phases/entities/phase.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FilterProjectsDto } from './dto/filter-projects.dto';
import { GalleriesService } from '@/modules/galleries/galleries.service';
import { UsersService } from '@/modules/users/users.service';

export interface ParticipantsGroupedByPhaseDto {
  phases: { phase: Phase; participants: User[] }[];
  unassigned: User[];
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private galleryService: GalleriesService,
    private usersService: UsersService
  ) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    try {
      const project = this.projectRepository.create({
        ...dto,
        project_manager: { id: dto.project_manager },
        program: { id: dto.program },
        categories: dto.categories.map((id) => ({ id }))
      });
      return await this.projectRepository.save(project);
    } catch {
      throw new BadRequestException();
    }
  }

  private parseParticipantsCsv(buffer: Buffer): Promise<{ name: string; email: string; phone_number?: string }[]> {
    return new Promise((resolve, reject) => {
      const rows: { name: string; email: string; phone_number?: string }[] = [];
      const stream = Readable.from(buffer.toString());
      stream
        .pipe(parse({ headers: true }))
        .on('data', (row: Record<string, string>) => {
          const name = (row.Name ?? row.name ?? '').trim();
          const email = (row.Email ?? row.email ?? '').trim();
          const phone_number = (row['Phone Number'] ?? row.phone_number ?? '').trim() || undefined;
          if (name && email) rows.push({ name, email, phone_number });
        })
        .on('end', () => resolve(rows))
        .on('error', reject);
    });
  }

  async addParticipantsFromCsv(id: string, file: Express.Multer.File) {
    const project = await this.projectRepository.findOneOrFail({
      where: { id },
      relations: ['participants']
    });
    if (!file.buffer) {
      throw new BadRequestException('CSV file buffer is required (use multipart with file field)');
    }
    const rows = await this.parseParticipantsCsv(file.buffer);
    if (rows.length === 0) {
      throw new BadRequestException('CSV has no valid rows (name and email required)');
    }
    let createdCount = 0;
    const userIds = new Set<string>(project.participants?.map((p) => p.id) ?? []);
    for (const row of rows) {
      const { user, created } = await this.usersService.findOrCreateParticipant(row);
      if (!userIds.has(user.id)) {
        userIds.add(user.id);
        if (created) createdCount += 1;
      }
    }
    const participants = await this.usersService.findByIds([...userIds]);
    await this.projectRepository.save({
      ...project,
      participants
    });
    return { added: participants.length, created: createdCount };
  }

  async addGallery(id: string, file: Express.Multer.File): Promise<void> {
    try {
      await this.findOne(id);
      const galleryDto = {
        image: file.filename,
        project: { id }
      };
      await this.galleryService.create(galleryDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async removeGallery(id: string): Promise<void> {
    try {
      await this.galleryService.remove(id);
    } catch {
      throw new BadRequestException();
    }
  }

  async findGallery(slug: string): Promise<Gallery[]> {
    const project = await this.findBySlug(slug);
    return project.gallery;
  }

  async findAll(queryParams: FilterProjectsDto): Promise<[Project[], number]> {
    const { page = 1, categories, q, filter = 'all' } = queryParams;
    const skip = (+page - 1) * 20;
    const query = this.projectRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'categories')
      .loadRelationCountAndMap('p.participantsCount', 'p.participants')
      .orderBy('p.updated_at', 'DESC');
    if (filter === 'published') query.andWhere('p.is_published = :isPublished', { isPublished: true });
    if (filter === 'drafts') query.andWhere('p.is_published = :isPublished', { isPublished: false });
    if (filter === 'highlighted') query.andWhere('p.is_highlighted = :isHighlighted', { isHighlighted: true });
    if (q) query.andWhere('(p.name LIKE :q OR p.description LIKE :q)', { q: `%${q}%` });
    if (categories) query.andWhere('categories.id IN (:categories)', { categories });
    return await query.skip(skip).take(20).getManyAndCount();
  }

  async findPublished(queryParams: FilterProjectsDto): Promise<[Project[], number]> {
    const { page = 1, categories, q } = queryParams;
    const skip = (+page - 1) * 40;
    const query = this.projectRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'categories')
      .andWhere('p.is_published = :is_published', { is_published: true });
    if (q) query.andWhere('(p.name LIKE :q OR p.description LIKE :q)', { q: `%${q}%` });
    if (categories) query.andWhere('categories.id IN (:categories)', { categories });
    return await query.skip(skip).take(40).orderBy('p.started_at', 'DESC').getManyAndCount();
  }

  async findRecent(): Promise<Project[]> {
    try {
      return await this.projectRepository.find({
        order: { ended_at: 'DESC' },
        where: { is_published: true },
        take: 5
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async addCover(id: string, file: Express.Multer.File): Promise<Project> {
    try {
      const project = await this.findOne(id);
      if (project.cover) fs.unlink(`./uploads/projects/${project.cover}`);
      return await this.projectRepository.save({
        ...project,
        cover: file.filename
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async findBySlug(slug: string): Promise<Project> {
    try {
      return await this.projectRepository
        .createQueryBuilder('p')
        .where('p.slug = :slug', { slug })
        .leftJoinAndSelect('p.categories', 'categories')
        .leftJoinAndSelect('p.project_manager', 'project_manager')
        .leftJoinAndSelect('p.program', 'subprogram')
        .leftJoinAndSelect('p.phases', 'phases')
        .leftJoinAndSelect('p.gallery', 'gallery')
        .leftJoinAndSelect('p.participants', 'participants')
        .getOne();
    } catch {
      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<Project> {
    try {
      return await this.projectRepository.findOneOrFail({
        where: { id },
        relations: ['categories', 'project_manager', 'gallery']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async getParticipants(id: string): Promise<User[]> {
    const project = await this.projectRepository.findOneOrFail({
      where: { id },
      relations: ['participants']
    });
    return project.participants ?? [];
  }

  async getParticipantsGroupedByPhase(id: string): Promise<ParticipantsGroupedByPhaseDto> {
    const project = await this.projectRepository.findOneOrFail({
      where: { id },
      relations: ['participants', 'phases', 'phases.participants']
    });
    const allParticipants = project.participants ?? [];
    const assignedUserIds = new Set<string>();
    const phasesWithParticipants: { phase: Phase; participants: User[] }[] = (project.phases ?? []).map((phase) => {
      const participants = phase.participants ?? [];
      participants.forEach((u) => assignedUserIds.add(u.id));
      return { phase, participants };
    });
    const unassigned = allParticipants.filter((u) => !assignedUserIds.has(u.id));
    return { phases: phasesWithParticipants, unassigned };
  }

  async highlight(id: string): Promise<Project> {
    const project = await this.findOne(id);
    project.is_highlighted = !project.is_highlighted;
    return await this.projectRepository.save(project);
  }

  async togglePublish(id: string): Promise<Project> {
    const project = await this.findOne(id);
    project.is_published = !project.is_published;
    return await this.projectRepository.save(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    try {
      const project = await this.findOne(id);
      return await this.projectRepository.save({
        ...project,
        ...dto,
        project_manager: dto.project_manager ? { id: dto.project_manager } : project.project_manager,
        program: { id: dto.program },
        categories: dto?.categories.map((type) => ({ id: type })) || project.categories
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const project = await this.findOne(id);
      await this.projectRepository.softDelete(project.id);
    } catch {
      throw new BadRequestException();
    }
  }
}
