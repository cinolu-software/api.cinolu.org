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
import { NotificationsService } from '@/modules/notifications/notifications.service';
import { Notification } from '@/modules/notifications/entities/notification.entity';
import { CreateNotificationDto } from '@/modules/notifications/dto/create-notification.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ProjectsService {
  private static readonly DEFAULT_PAGE_SIZE = 20;
  private static readonly PUBLISHED_PAGE_SIZE = 40;

  private mapUniqueUsers(participations: ProjectParticipation[]): User[] {
    const seen = new Set<string>();
    return participations
      .map((p) => p.user)
      .filter((user) => {
        if (seen.has(user.id)) return false;
        seen.add(user.id);
        return true;
      });
  }

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectParticipation)
    private readonly participationRepository: Repository<ProjectParticipation>,
    private readonly galleryService: GalleriesService,
    private readonly usersService: UsersService,
    private readonly venturesService: VenturesService,
    private readonly notificationsService: NotificationsService,
    private readonly eventEmitter: EventEmitter2
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

  async addParticipantsFromCsv(projectId: string, file: Express.Multer.File): Promise<void> {
    if (!file?.buffer) {
      throw new BadRequestException('A valid CSV file is required');
    }
    const project = await this.projectRepository.findOneOrFail({
      where: { id: projectId },
      relations: ['participations', 'participations.user']
    });
    const rows = await this.parseParticipantsCsv(file.buffer);
    const userIds = new Set<string>(project.participations?.map((p) => p.user.id) ?? []);
    for (const row of rows) {
      const user = await this.usersService.findOrCreateParticipant(row);
      if (!userIds.has(user.id)) {
        userIds.add(user.id);
      }
    }
    for (const userId of userIds) {
      const existing = await this.participationRepository.findOne({
        where: { project: { id: projectId }, user: { id: userId } }
      });
      if (!existing) {
        await this.participationRepository.save({
          created_at: project.started_at,
          user: { id: userId },
          project: { id: projectId },
          venture: null
        });
      }
    }
  }

  async addImage(projectId: string, file: Express.Multer.File): Promise<void> {
    try {
      await this.findOne(projectId);
      const galleryDto = {
        image: file.filename,
        project: { id: projectId }
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
    return this.galleryService.findProjectGallery(slug);
  }

  async findAll(queryParams: FilterProjectsDto): Promise<[Project[], number]> {
    const { page = 1, categories, q, filter = 'all' } = queryParams;
    const categoryIds = Array.isArray(categories) ? categories : categories ? [categories] : [];
    const skip = (+page - 1) * ProjectsService.DEFAULT_PAGE_SIZE;
    const query = this.projectRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'categories')
      .loadRelationCountAndMap('p.participantsCount', 'p.participations')
      .orderBy('p.updated_at', 'DESC');
    if (filter === 'published') query.andWhere('p.is_published = :isPublished', { isPublished: true });
    if (filter === 'drafts') query.andWhere('p.is_published = :isPublished', { isPublished: false });
    if (filter === 'highlighted') query.andWhere('p.is_highlighted = :isHighlighted', { isHighlighted: true });
    if (q) query.andWhere('(p.name LIKE :q OR p.description LIKE :q)', { q: `%${q}%` });
    if (categoryIds.length) query.andWhere('categories.id IN (:...categoryIds)', { categoryIds });
    return await query.skip(skip).take(ProjectsService.DEFAULT_PAGE_SIZE).getManyAndCount();
  }

  async findUserParticipations(userId: string): Promise<ProjectParticipation[]> {
    return await this.participationRepository.find({
      where: { user: { id: userId } },
      relations: ['project', 'project.phases', 'phases', 'venture']
    });
  }

  async findPublished(queryParams: FilterProjectsDto): Promise<[Project[], number]> {
    const { page = 1, categories, q, status } = queryParams;
    const categoryIds = Array.isArray(categories) ? categories : categories ? [categories] : [];
    const skip = (+page - 1) * ProjectsService.PUBLISHED_PAGE_SIZE;
    const query = this.projectRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categories', 'categories')
      .andWhere('p.is_published = :is_published', { is_published: true });
    if (q) query.andWhere('(p.name LIKE :q OR p.description LIKE :q)', { q: `%${q}%` });
    if (categoryIds.length) query.andWhere('categories.id IN (:...categoryIds)', { categoryIds });
    if (status === 'past') query.andWhere('p.ended_at < NOW()');
    if (status === 'current') query.andWhere('p.started_at <= NOW() AND p.ended_at >= NOW()');
    if (status === 'future') query.andWhere('p.started_at > NOW()');
    return await query
      .skip(skip)
      .take(ProjectsService.PUBLISHED_PAGE_SIZE)
      .orderBy('p.started_at', 'DESC')
      .getManyAndCount();
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

  async addCover(projectId: string, file: Express.Multer.File): Promise<Project> {
    try {
      const project = await this.findOne(projectId);
      if (project.cover) await fs.unlink(`./uploads/projects/${project.cover}`).catch(() => undefined);
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
      return await this.projectRepository.findOneOrFail({
        where: { slug },
        relations: ['categories', 'project_manager', 'program', 'gallery']
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async findOne(projectId: string): Promise<Project> {
    try {
      return await this.projectRepository.findOneOrFail({
        where: { id: projectId },
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
      relations: ['user', 'venture', 'phases'],
      order: { created_at: 'ASC' }
    });
  }

  async findParticipantsByProject(projectId: string): Promise<User[]> {
    await this.findOne(projectId);
    const participations = await this.participationRepository.find({
      where: { project: { id: projectId } },
      relations: ['user']
    });
    return this.mapUniqueUsers(participations);
  }

  async findParticipantsByPhase(phaseId: string): Promise<User[]> {
    const participations = await this.participationRepository.find({
      where: { phases: { id: phaseId } },
      relations: ['user']
    });
    return this.mapUniqueUsers(participations);
  }

  async createNotification(projectId: string, user: User, dto: CreateNotificationDto): Promise<Notification> {
    try {
      await this.findOne(projectId);
      const notification = await this.notificationsService.create(projectId, user.id, dto);
      return this.notificationsService.findOne(notification.id);
    } catch {
      throw new BadRequestException();
    }
  }

  async sendNotification(notificationId: string): Promise<Notification> {
    try {
      const notification = await this.notificationsService.findOne(notificationId);
      const phaseParticipants = await this.findParticipantsByPhase(notification.phase.id);
      const projectParticipants = await this.findParticipantsByProject(notification.project.id);
      const recipients: User[] = notification.phase ? phaseParticipants : projectParticipants;
      this.eventEmitter.emit('notify.participants', recipients, notification);
      return await this.notificationsService.sendNotification(notificationId);
    } catch {
      throw new BadRequestException();
    }
  }

  async toggleHighlight(projectId: string): Promise<Project> {
    const project = await this.findOne(projectId);
    project.is_highlighted = !project.is_highlighted;
    return await this.projectRepository.save(project);
  }

  async togglePublish(projectId: string): Promise<Project> {
    const project = await this.findOne(projectId);
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
