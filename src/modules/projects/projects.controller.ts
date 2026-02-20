import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createDiskUploadOptions, createMemoryUploadOptions } from '@/core/helpers/upload.helper';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ParticipateProjectDto } from './dto/participate.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './services/projects.service';
import { ProjectParticipationService } from './services/project-participations.service';
import { ProjectNotificationService } from './services/project-notifications.service';
import { ProjectMediaService } from './services/project-media.service';
import { FilterProjectsDto } from './dto/filter-projects.dto';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { Notification } from '@/modules/notifications/entities/notification.entity';
import { CreateNotificationDto } from '@/modules/notifications/dto/create-notification.dto';
import { ProjectParticipation } from './entities/project-participation.entity';
import { MoveParticipantsDto } from './dto/move-participants.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly participationService: ProjectParticipationService,
    private readonly notificationService: ProjectNotificationService,
    private readonly mediaService: ProjectMediaService
  ) {}

  @Post()
  @UseRoles({ resource: 'projects', action: 'create' })
  create(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(dto);
  }

  @Get()
  @UseRoles({ resource: 'projects', action: 'read' })
  findAll(@Query() query: FilterProjectsDto): Promise<[Project[], number]> {
    return this.projectsService.findAll(query);
  }

  @Get('recent')
  @Public()
  findRecent(): Promise<Project[]> {
    return this.projectsService.findRecent();
  }

  @Post('participants/move')
  @UseRoles({ resource: 'projects', action: 'update' })
  moveParticipants(@Body() dto: MoveParticipantsDto): Promise<void> {
    return this.participationService.moveParticipants(dto);
  }

  @Post('participants/remove')
  @UseRoles({ resource: 'projects', action: 'update' })
  removeParticipantsFromPhase(@Body() dto: MoveParticipantsDto): Promise<void> {
    return this.participationService.removeParticipantsFromPhase(dto);
  }

  @Get('published')
  @Public()
  findPublished(@Query() query: FilterProjectsDto): Promise<[Project[], number]> {
    return this.projectsService.findPublished(query);
  }

  @Get('by-slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Project> {
    return this.projectsService.findBySlug(slug);
  }

  @Post(':projectId/participate')
  participate(
    @Param('projectId') projectId: string,
    @CurrentUser() user: User,
    @Body() dto: ParticipateProjectDto
  ): Promise<void> {
    return this.participationService.participate(projectId, user, dto);
  }

  @Get('me/participations')
  findUserParticipations(@CurrentUser() user: User): Promise<ProjectParticipation[]> {
    return this.participationService.findUserParticipations(user.id);
  }

  @Get(':projectId/participations')
  @UseRoles({ resource: 'projects', action: 'read' })
  findParticipations(@Param('projectId') projectId: string): Promise<ProjectParticipation[]> {
    return this.participationService.findParticipations(projectId);
  }

  @Get(':projectId')
  @UseRoles({ resource: 'projects', action: 'read' })
  findOne(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectsService.findOne(projectId);
  }

  @Post(':projectId/participants/import-csv')
  @UseRoles({ resource: 'projects', action: 'update' })
  @UseInterceptors(
    FileInterceptor(
      'file',
      createMemoryUploadOptions({
        fileFilter: (_req, file, cb) => {
          const allowed = ['text/csv', 'application/csv', 'text/plain'];
          const isCsv = allowed.includes(file.mimetype) || file.originalname?.toLowerCase().endsWith('.csv');
          cb(null, !!isCsv);
        },
        limits: { fileSize: 2 * 1024 * 1024 }
      })
    )
  )
  addParticipantsFromCsv(
    @Param('projectId') projectId: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    return this.participationService.addParticipantsFromCsv(projectId, file);
  }

  @Post(':projectId/notifications')
  @UseRoles({ resource: 'projects', action: 'update' })
  createNotification(
    @Param('projectId') projectId: string,
    @CurrentUser() user: User,
    @Body() dto: CreateNotificationDto
  ): Promise<Notification> {
    return this.notificationService.createNotification(projectId, user, dto);
  }

  @Post('notifications/:notificationId/send')
  @UseRoles({ resource: 'projects', action: 'update' })
  sendNotification(@Param('notificationId') notificationId: string): Promise<Notification> {
    return this.notificationService.sendNotification(notificationId);
  }

  @Post(':projectId/gallery')
  @UseRoles({ resource: 'projects', action: 'update' })
  @UseInterceptors(FileInterceptor('image', createDiskUploadOptions('./uploads/galleries')))
  addGallery(@Param('projectId') projectId: string, @UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.mediaService.addImage(projectId, file);
  }

  @Delete('gallery/:galleryId')
  @UseRoles({ resource: 'projects', action: 'update' })
  removeGallery(@Param('galleryId') galleryId: string): Promise<void> {
    return this.mediaService.removeImage(galleryId);
  }

  @Get('by-slug/:slug/gallery')
  @Public()
  findGallery(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.mediaService.findGallery(slug);
  }

  @Patch(':projectId/publish')
  @UseRoles({ resource: 'projects', action: 'update' })
  togglePublish(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectsService.togglePublish(projectId);
  }

  @Post(':projectId/cover')
  @UseRoles({ resource: 'projects', action: 'update' })
  @UseInterceptors(FileInterceptor('cover', createDiskUploadOptions('./uploads/projects')))
  addCover(@Param('projectId') projectId: string, @UploadedFile() file: Express.Multer.File): Promise<Project> {
    return this.mediaService.addCover(projectId, file);
  }

  @Patch(':projectId/highlight')
  @UseRoles({ resource: 'projects', action: 'update' })
  toggleHighlight(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectsService.toggleHighlight(projectId);
  }

  @Patch(':projectId')
  @UseRoles({ resource: 'projects', action: 'update' })
  update(@Param('projectId') projectId: string, @Body() dto: UpdateProjectDto): Promise<Project> {
    return this.projectsService.update(projectId, dto);
  }

  @Delete(':projectId')
  @UseRoles({ resource: 'projects', action: 'delete' })
  remove(@Param('projectId') projectId: string): Promise<void> {
    return this.projectsService.remove(projectId);
  }
}
