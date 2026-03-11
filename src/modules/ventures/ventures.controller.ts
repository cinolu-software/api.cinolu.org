import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query
} from '@nestjs/common';
import { VenturesService } from './services/ventures.service';
import { VentureMediaService } from './services/venture-media.service';
import { CreateVentureDto } from './dto/create-venture.dto';
import { UpdateVentureDto } from './dto/update-venture.dto';
import { Venture } from './entities/venture.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { createDiskUploadOptions } from '@/core/helpers/upload.helper';
import { CurrentUser } from 'nestjs-session-auth';
import { User } from '@/modules/users/entities/user.entity';
import { FilterVenturesDto } from './dto/filter-ventures.dto';
import { Rbac } from 'nestjs-session-auth';
import { Public } from 'nestjs-session-auth';
import { Gallery } from '@/shared/galleries/entities/gallery.entity';

@Controller('ventures')
export class VenturesController {
  constructor(
    private readonly venturesService: VenturesService,
    private readonly ventureMediaService: VentureMediaService
  ) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateVentureDto): Promise<Venture> {
    return this.venturesService.create(user, dto);
  }

  @Get('published')
  @Public()
  findPublished(): Promise<Venture[]> {
    return this.venturesService.findPublished();
  }

  @Get()
  @Rbac({ resource: 'ventures', action: 'read' })
  findAll(@Query() query: FilterVenturesDto): Promise<[Venture[], number]> {
    return this.venturesService.findAll(query);
  }

  @Get('by-slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Venture> {
    return this.venturesService.findBySlug(slug);
  }

  @Patch('by-slug/:slug/publish')
  @Rbac({ resource: 'publishVenture', action: 'update' })
  togglePublish(@Param('slug') slug: string): Promise<Venture> {
    return this.venturesService.togglePublish(slug);
  }

  @Get('me/paginated')
  findMinePaginated(@Query('page') page: string, @CurrentUser() user: User): Promise<[Venture[], number]> {
    return this.venturesService.findByUser(page, user);
  }

  @Get('me')
  findMine(@CurrentUser() user: User): Promise<Venture[]> {
    return this.venturesService.findByUserUnpaginated(user);
  }

  @Post(':ventureId/gallery')
  @Rbac({ resource: 'ventures', action: 'update' })
  @UseInterceptors(FileInterceptor('image', createDiskUploadOptions('./uploads/galleries')))
  addImage(@Param('ventureId') ventureId: string, @UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.ventureMediaService.addImage(ventureId, file);
  }

  @Delete('gallery/:galleryId')
  @Rbac({ resource: 'ventures', action: 'update' })
  removeGallery(@Param('galleryId') galleryId: string): Promise<void> {
    return this.ventureMediaService.removeImage(galleryId);
  }

  @Get('by-slug/:slug/gallery')
  @Public()
  findGallery(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.ventureMediaService.findGallery(slug);
  }

  @Post(':ventureId/logo')
  @Rbac({ resource: 'ventures', action: 'update' })
  @UseInterceptors(FileInterceptor('logo', createDiskUploadOptions('./uploads/ventures/logos')))
  addLogo(@Param('ventureId') ventureId: string, @UploadedFile() file: Express.Multer.File): Promise<Venture> {
    return this.ventureMediaService.addLogo(ventureId, file);
  }

  @Post(':ventureId/cover')
  @Rbac({ resource: 'ventures', action: 'update' })
  @UseInterceptors(FileInterceptor('cover', createDiskUploadOptions('./uploads/ventures/covers')))
  addCover(@Param('ventureId') ventureId: string, @UploadedFile() file: Express.Multer.File): Promise<Venture> {
    return this.ventureMediaService.addCover(ventureId, file);
  }

  @Get(':ventureId')
  findOne(@Param('ventureId') ventureId: string): Promise<Venture> {
    return this.venturesService.findOne(ventureId);
  }

  @Patch(':slug')
  @Rbac({ resource: 'ventures', action: 'update' })
  update(@Param('slug') slug: string, @Body() dto: UpdateVentureDto): Promise<Venture> {
    return this.venturesService.update(slug, dto);
  }

  @Delete(':id')
  @Rbac({ resource: 'ventures', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.venturesService.remove(id);
  }
}
