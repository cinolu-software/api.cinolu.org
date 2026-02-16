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
import { diskStorage, memoryStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ParticipateProjectDto } from './dto/participate.dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { FilterProjectsDto } from './dto/filter-projects.dto';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { Notification } from '@/modules/notifications/entities/notification.entity';
import { CreateNotificationDto } from '@/modules/notifications/dto/create-notification.dto';
import { ProjectParticipation } from './entities/participation.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

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
    return this.projectsService.participate(projectId, user, dto);
  }

  @Get('me/participations')
  findUserParticipations(@CurrentUser() user: User): Promise<ProjectParticipation[]> {
    return this.projectsService.findUserParticipations(user.id);
  }

  @Get(':projectId/participations')
  @UseRoles({ resource: 'projects', action: 'read' })
  findParticipations(@Param('projectId') projectId: string): Promise<ProjectParticipation[]> {
    return this.projectsService.findParticipations(projectId);
  }

  @Get(':projectId')
  @UseRoles({ resource: 'projects', action: 'read' })
  findOne(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectsService.findOne(projectId);
  }

  @Post(':projectId/participants/import-csv')
  @UseRoles({ resource: 'projects', action: 'update' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: (_req, file, cb) => {
        const allowed = ['text/csv', 'application/csv', 'text/plain'];
        const isCsv = allowed.includes(file.mimetype) || file.originalname?.toLowerCase().endsWith('.csv');
        cb(null, !!isCsv);
      },
      limits: { fileSize: 2 * 1024 * 1024 }
    })
  )
  addParticipantsFromCsv(@Param('projectId') projectId: string, @UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.projectsService.addParticipantsFromCsv(projectId, file);
  }

  @Post(':projectId/notifications')
  @UseRoles({ resource: 'projects', action: 'update' })
  createNotification(
    @Param('projectId') projectId: string,
    @CurrentUser() user: User,
    @Body() dto: CreateNotificationDto
  ): Promise<Notification> {
    return this.projectsService.createNotification(projectId, user, dto);
  }

  @Post('notifications/:notificationId/send')
  @UseRoles({ resource: 'projects', action: 'update' })
  sendNotification(@Param('notificationId') notificationId: string): Promise<Notification> {
    return this.projectsService.sendNotification(notificationId);
  }

  @Post(':projectId/gallery')
  @UseRoles({ resource: 'projects', action: 'update' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/galleries',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addGallery(@Param('projectId') projectId: string, @UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.projectsService.addImage(projectId, file);
  }

  @Delete('gallery/:galleryId')
  @UseRoles({ resource: 'projects', action: 'update' })
  removeGallery(@Param('galleryId') galleryId: string): Promise<void> {
    return this.projectsService.removeImage(galleryId);
  }

  @Get('by-slug/:slug/gallery')
  @Public()
  findGallery(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.projectsService.findGallery(slug);
  }

  @Patch(':projectId/publish')
  @UseRoles({ resource: 'projects', action: 'update' })
  togglePublish(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectsService.togglePublish(projectId);
  }

  @Post(':projectId/cover')
  @UseRoles({ resource: 'projects', action: 'update' })
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/projects',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addCover(@Param('projectId') projectId: string, @UploadedFile() file: Express.Multer.File): Promise<Project> {
    return this.projectsService.addCover(projectId, file);
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
