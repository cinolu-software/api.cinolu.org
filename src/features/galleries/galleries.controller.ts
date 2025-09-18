import { Controller, Delete, Get } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { Public } from '../../shared/decorators/public.decorator';
import { Gallery } from './entities/gallery.entity';
import { UseRoles } from 'nest-access-control';

@Controller('galleries')
export class GalleriesController {
  constructor(private galleriesService: GalleriesService) {}

  @Get()
  @Public()
  findAll(): Promise<Gallery[]> {
    return this.galleriesService.findAll();
  }

  @Delete(':id')
  @UseRoles({ resource: 'galleries', action: 'delete' })
  remove(id: string): Promise<void> {
    return this.galleriesService.remove(id);
  }
}
