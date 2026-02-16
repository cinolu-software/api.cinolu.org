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
import { VenturesService } from './ventures.service';
import { CreateVentureDto } from './dto/create-venture.dto';
import { UpdateVentureDto } from './dto/update-venture.dto';
import { Venture } from './entities/venture.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { User } from '@/modules/users/entities/user.entity';
import { FilterVenturesDto } from './dto/filter-ventures.dto';
import { UseRoles } from 'nest-access-control';
import { Gallery } from '@/modules/galleries/entities/gallery.entity';
import { Public } from '@/core/auth/decorators/public.decorator';

@Controller('ventures')
export class VenturesController {
  constructor(private readonly venturesService: VenturesService) {}

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
  @UseRoles({ resource: 'ventures', action: 'read', possession: 'any' })
  findAll(@Query() query: FilterVenturesDto): Promise<[Venture[], number]> {
    return this.venturesService.findAll(query);
  }

  @Get('by-slug/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string): Promise<Venture> {
    return this.venturesService.findBySlug(slug);
  }

  @Patch('by-slug/:slug/publish')
  @UseRoles({ resource: 'publishVenture', action: 'update' })
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
  @UseRoles({ resource: 'ventures', action: 'update', possession: 'own' })
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
  addGallery(@Param('ventureId') ventureId: string, @UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.venturesService.addGallery(ventureId, file);
  }

  @Delete('gallery/:galleryId')
  @UseRoles({ resource: 'ventures', action: 'update', possession: 'own' })
  removeGallery(@Param('galleryId') galleryId: string): Promise<void> {
    return this.venturesService.removeGallery(galleryId);
  }

  @Get('by-slug/:slug/gallery')
  @Public()
  findGallery(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.venturesService.findGallery(slug);
  }

  @Post(':ventureId/logo')
  @UseRoles({ resource: 'ventures', action: 'update', possession: 'own' })
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/ventures/logos',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addLogo(@Param('ventureId') ventureId: string, @UploadedFile() file: Express.Multer.File): Promise<Venture> {
    return this.venturesService.addLogo(ventureId, file);
  }

  @Post(':ventureId/cover')
  @UseRoles({ resource: 'ventures', action: 'update', possession: 'own' })
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/ventures/covers',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addCover(@Param('ventureId') ventureId: string, @UploadedFile() file: Express.Multer.File): Promise<Venture> {
    return this.venturesService.addCover(ventureId, file);
  }

  @Get(':ventureId')
  findOne(@Param('ventureId') ventureId: string): Promise<Venture> {
    return this.venturesService.findOne(ventureId);
  }

  @Patch(':slug')
  @UseRoles({ resource: 'ventures', action: 'update', possession: 'own' })
  update(@Param('slug') slug: string, @Body() dto: UpdateVentureDto): Promise<Venture> {
    return this.venturesService.update(slug, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'ventures', action: 'delete', possession: 'own' })
  remove(@Param('id') id: string): Promise<void> {
    return this.venturesService.remove(id);
  }
}
