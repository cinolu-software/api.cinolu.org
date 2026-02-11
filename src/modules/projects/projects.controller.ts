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
import { Notification } from '../notifications/entities/notification.entity';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto';
import { ProjectParticipation } from './entities/participation.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post('')
  @UseRoles({ resource: 'projects', action: 'create' })
  create(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(dto);
  }

  @Get('')
  @UseRoles({ resource: 'projects', action: 'read' })
  findAll(@Query() qp: FilterProjectsDto): Promise<[Project[], number]> {
    return this.projectsService.findAll(qp);
  }

  @Get('find-recent')
  @Public()
  findRecent(): Promise<Project[]> {
    return this.projectsService.findRecent();
  }

  @Get('find-published')
  @Public()
  findPublished(@Query() queryParams: FilterProjectsDto): Promise<[Project[], number]> {
    return this.projectsService.findPublished(queryParams);
  }

  @Get('slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Project> {
    return this.projectsService.findBySlug(slug);
  }

  @Get(':id/participations')
  @UseRoles({ resource: 'projects', action: 'read' })
  findParticipations(@Param('id') id: string) {
    return this.projectsService.findParticipations(id);
  }

  @Get(':id')
  @UseRoles({ resource: 'projects', action: 'read' })
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Post(':id/participate')
  @UseRoles({ resource: 'projects', action: 'update' })
  participate(@Param('id') id: string, @CurrentUser() user: User, @Body() dto: ParticipateProjectDto): Promise<void> {
    return this.projectsService.participate(id, user, dto);
  }

  @Post(':id/participants/csv')
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
  addParticipantsFromCsv(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.projectsService.addParticipantsFromCsv(id, file);
  }

  @Post(':id/notification')
  @UseRoles({ resource: 'projects', action: 'update' })
  createNotification(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: CreateNotificationDto
  ): Promise<Notification> {
    return this.projectsService.createNotification(id, user, dto);
  }

  @Post('notify/:notificationId')
  @UseRoles({ resource: 'projects', action: 'update' })
  sendNotification(@Param('notificationId') id: string): Promise<Notification> {
    return this.projectsService.sendNotification(id);
  }

  @Get('user/participations')
  @UseRoles({ resource: 'projects', action: 'read' })
  findUserParticipations(@CurrentUser() user: User): Promise<ProjectParticipation[]> {
    return this.projectsService.findUserParticipations(user.id);
  }

  @Post('gallery/:id')
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
  addGallery(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.projectsService.addImage(id, file);
  }

  @Delete('gallery/remove/:id')
  @UseRoles({ resource: 'projects', action: 'update' })
  removeGallery(@Param('id') id: string): Promise<void> {
    return this.projectsService.removeImage(id);
  }

  @Get('gallery/:slug')
  @Public()
  findGallery(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.projectsService.findGallery(slug);
  }

  @Post('publish/:id')
  @UseRoles({ resource: 'projects', action: 'update' })
  togglePublish(@Param('id') id: string): Promise<Project> {
    return this.projectsService.togglePublish(id);
  }

  @Post('cover/:id')
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
  addCover(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Project> {
    return this.projectsService.addCover(id, file);
  }

  @Patch('highlight/:id')
  @UseRoles({ resource: 'projects', action: 'update' })
  toggleHighlight(@Param('id') id: string): Promise<Project> {
    return this.projectsService.showcase(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'projects', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto): Promise<Project> {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'projects', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(id);
  }
}
