import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { UseRoles } from 'nest-access-control';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Gallery } from './entities/gallery.entity';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('galleries')
export class GalleriesController {
  constructor(private galleriesService: GalleriesService) {}

  @Get('project/:slug')
  @Public()
  findByProject(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.galleriesService.findByProject(slug);
  }

  @Get('event/:slug')
  @Public()
  findByEvent(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.galleriesService.findByEvent(slug);
  }

  @Get('venture/:slug')
  @Public()
  findByVenture(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.galleriesService.findByVenture(slug);
  }

  @Get('product/:slug')
  @Public()
  findByProduct(@Param('slug') slug: string): Promise<Gallery[]> {
    return this.galleriesService.findByProduct(slug);
  }

  @Post('project/:id')
  @Public()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/galleries/projects',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  uploadProjectImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Gallery> {
    return this.galleriesService.uploadProjectImage(id, file);
  }

  @Post('event/:id')
  @UseRoles({ resource: 'events', action: 'update' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/galleries/events',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  uploadEventImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Gallery> {
    return this.galleriesService.uploadEventImage(id, file);
  }

  @Post('venture/:id')
  @UseRoles({ resource: 'ventures', action: 'update', possession: 'own' })
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
  uploadVentureImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Gallery> {
    return this.galleriesService.uploadVentureImage(id, file);
  }

  @Post('product/:id')
  @UseRoles({ resource: 'ventures', action: 'update', possession: 'own' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/galleries/products',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  uploadProductImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Gallery> {
    return this.galleriesService.uploadProductImage(id, file);
  }

  @Delete('project/:id')
  @UseRoles({ resource: 'projects', action: 'update' })
  deleteProjectImage(@Param('id') id: string): Promise<void> {
    return this.galleriesService.deleteProjectImage(id);
  }

  @Delete('event/:id')
  @UseRoles({ resource: 'events', action: 'update' })
  deleteEventImage(@Param('id') id: string): Promise<void> {
    return this.galleriesService.deleteEventImage(id);
  }

  @Delete('venture/:id')
  @UseRoles({ resource: 'ventures', action: 'update', possession: 'own' })
  deleteVentureImage(@Param('id') id: string): Promise<void> {
    return this.galleriesService.deleteVentureImage(id);
  }

  @Delete('product/:id')
  @UseRoles({ resource: 'products', action: 'update', possession: 'own' })
  deleteProductImage(@Param('id') id: string): Promise<void> {
    return this.galleriesService.deleteProductImage(id);
  }
}
