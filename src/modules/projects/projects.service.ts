import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { Readable } from 'stream';
import { parse } from 'fast-csv';
import { Project } from './entities/project.entity';
import { ProjectParticipation } from './entities/participation.entity';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { User } from '@/modules/users/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FilterProjectsDto } from './dto/filter-projects.dto';
import { GalleriesService } from '@/modules/galleries/galleries.service';
import { UsersService } from '@/modules/users/users.service';
import { VenturesService } from '@/modules/ventures/ventures.service';
import { ParticipateProjectDto } from './dto/participate.dto';
import { NotifyParticipantsDto } from './dto/notify-participants.dto';
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { Notification } from '../notifications/entities/notification.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(ProjectParticipation)
    private participationRepository: Repository<ProjectParticipation>,
    private galleryService: GalleriesService,
    private usersService: UsersService,
    private venturesService: VenturesService,
    private notificationsService: NotificationsService
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

  async findParticipants(projectId: string): Promise<{ userId: string }[]> {
    return await this.participationRepository
      .createQueryBuilder('pp')
      .select('DISTINCT pp.userId', 'userId')
      .where('pp.projectId = :projectId', { projectId })
      .getRawMany<{ userId: string }>();
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

  async addParticipantsFromCsv(id: string, file: Express.Multer.File): Promise<void> {
    const project = await this.projectRepository.findOneOrFail({
      where: { id },
      relations: ['participations', 'participations.user']
    });
    const rows = await this.parseParticipantsCsv(file.buffer);
    const userIds = new Set<string>(project.participations?.map((p) => p.user.id) ?? []);
    const newParticipantIds: string[] = [];
    for (const row of rows) {
      const user = await this.usersService.findOrCreateParticipant(row);
      if (!userIds.has(user.id)) {
        userIds.add(user.id);
        newParticipantIds.push(user.id);
      }
    }
    for (const userId of userIds) {
      const existing = await this.participationRepository.findOne({
        where: { project: { id }, user: { id: userId } }
      });
      if (!existing) {
        await this.participationRepository.save({
          created_at: project.started_at,
          user: { id: userId },
          project: { id },
          venture: null
        });
      }
    }
  }

  async addImage(id: string, file: Express.Multer.File): Promise<void> {
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

  async removeImage(id: string): Promise<void> {
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
      .loadRelationCountAndMap('p.participantsCount', 'p.participations')
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
      const project = await this.projectRepository.findOneOrFail({
        where: { slug },
        relations: ['categories', 'project_manager', 'program', 'gallery']
      });
      return project;
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

  async findParticipations(projectId: string): Promise<ProjectParticipation[]> {
    await this.findOne(projectId);
    return this.participationRepository.find({
      where: { project: { id: projectId } },
      relations: ['user', 'venture', 'phase'],
      order: { created_at: 'ASC' }
    });
  }

  async findParticipantsIds(phaseId: string): Promise<string[]> {
    try {
      const rows = await this.participationRepository
        .createQueryBuilder('pp')
        .select('DISTINCT pp.userId', 'userId')
        .innerJoin('pp.project', 'project')
        .innerJoin('pp.phase', 'phase')
        .where('phase.id = :phaseId', { phaseId })
        .getRawMany<{ userId: string }>();
      return rows.map((row) => row.userId);
    } catch {
      throw new BadRequestException();
    }
  }

  async notifyParticipants(projectId: string, dto: NotifyParticipantsDto): Promise<Notification> {
    try {
      await this.findOne(projectId);
      let userIds: string[] = [];
      if (dto.phase_id) {
        userIds = await this.findParticipantsIds(dto.phase_id);
      } else {
        const participants = await this.findParticipants(projectId);
        userIds = participants.map((row) => row.userId);
      }
      return await this.notificationsService.create(userIds, dto);
    } catch {
      throw new BadRequestException();
    }
  }

  async showcase(id: string): Promise<Project> {
    const project = await this.findOne(id);
    project.is_highlighted = !project.is_highlighted;
    return await this.projectRepository.save(project);
  }

  async togglePublish(id: string): Promise<Project> {
    const project = await this.findOne(id);
    return await this.projectRepository.save({
      ...project,
      is_published: !project.is_published
    });
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    try {
      const project = await this.findOne(id);
      return await this.projectRepository.save({
        ...project,
        ...dto,
        project_manager: { id: dto?.project_manager ?? project.project_manager.id },
        program: { id: dto?.program ?? project.program.id },
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

  async participate(projectId: string, user: User, dto: ParticipateProjectDto): Promise<void> {
    try {
      await this.findOne(projectId);
      const venture = await this.venturesService.findOne(dto.ventureId);
      await this.participationRepository.save({
        user: { id: user.id },
        project: { id: projectId },
        venture: venture ? { id: venture.id } : null
      });
    } catch {
      throw new BadRequestException();
    }
  }
}
