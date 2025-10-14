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
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from '../../core/users/entities/user.entity';
import { FilterVenturesDto } from './dto/filter-ventures.dto';
import { UseRoles } from 'nest-access-control';
import { Gallery } from '../galleries/entities/gallery.entity';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('ventures')
export class VenturesController {
  constructor(private venturesService: VenturesService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateVentureDto): Promise<Venture> {
    return this.venturesService.create(user, dto);
  }

  @Get()
  @UseRoles({ resource: 'ventures', action: 'read', possession: 'any' })
  findAll(@Query() queryParams: FilterVenturesDto): Promise<[Venture[], number]> {
    return this.venturesService.findAll(queryParams);
  }

  @Get('by-slug/:slug')
  findBySlug(@Param('slug') slug: string): Promise<Venture> {
    return this.venturesService.findBySlug(slug);
  }

  @Patch('toggle-publish/:slug')
  @UseRoles({ resource: 'publishVenture', action: 'update' })
  togglePublish(@Param('slug') slug: string): Promise<Venture> {
    return this.venturesService.togglePublish(slug);
  }

  @Get('by-user')
  findByUser(@Query('page') page: string, @CurrentUser() user: User): Promise<[Venture[], number]> {
    return this.venturesService.findByUser(page, user);
  }

  @Get('by-user/unpaginated')
  findByUserUnpaginated(@CurrentUser() user: User): Promise<Venture[]> {
    return this.venturesService.findByUserUnpaginated(user);
  }

  @Post('gallery/:id')
  @UseRoles({ resource: 'ventures', action: 'update' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/galleries/ventures',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addGallery(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Gallery> {
    return this.venturesService.addGallery(id, file);
  }

  @Post('gallery/remove/:id/:galleryId')
  @UseRoles({ resource: 'ventures', action: 'update' })
  removeGallery(@Param('id') id: string, @Param('galleryId') galleryId: string): Promise<void> {
    return this.venturesService.removeGallery(id, galleryId);
  }

  @Get('gallery/:id')
  @Public()
  findGallery(@Param('id') id: string): Promise<Gallery[]> {
    return this.venturesService.findGallery(id);
  }

  @Post('add-logo/:id')
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
  addLogo(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.venturesService.addLogo(id, file);
  }

  @Post('add-cover/:id')
  @UseRoles({ resource: 'ventures', action: 'update', possession: 'own' })
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/enterprises/covers',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addCover(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.venturesService.addCover(id, file);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Venture> {
    return this.venturesService.findOne(id);
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
