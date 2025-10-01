import { Controller, Delete, Param } from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { UseRoles } from 'nest-access-control';

@Controller('galleries')
export class GalleriesController {
  constructor(private galleriesService: GalleriesService) {}

  @Delete(':id')
  @UseRoles({ resource: 'galleries', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.galleriesService.remove(id);
  }
}
