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
  Query,
  UploadedFiles
} from '@nestjs/common';
import { VenturesService } from './ventures.service';
import { CreateVentureDto } from './dto/create-venture.dto';
import { UpdateVentureDto } from './dto/update-venture.dto';
import { Venture } from './entities/venture.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from '../../core/users/entities/user.entity';
import { FilterVenturesDto } from './dto/filter-ventures.dto';
import { UseRoles } from 'nest-access-control';

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
  @UseRoles({ resource: 'publishVenture', action: 'update', possession: 'any' })
  togglePublish(@Param('slug') slug: string): Promise<Venture> {
    return this.venturesService.togglePublish(slug);
  }

  @Get('by-user')
  findByUser(@Query('page') page: string, @CurrentUser() user: User): Promise<[Venture[], number]> {
    return this.venturesService.findByUser(page, user);
  }


  @Post('images/:id')
  @UseRoles({ resource: 'ventures', action: 'update' })
  @UseInterceptors(
    FilesInterceptor('images', 5,{
      storage: diskStorage({
        destination: './uploads/galleries',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addImages(@Param('id') id: string, @UploadedFiles() files: Express.Multer.File[]): Promise<Venture> {
    return this.venturesService.addImages(id, files);
  }

  @Post('add-logo/:id')
  @UseRoles({ resource: 'ventures', action: 'update', possession: 'own' })
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/enterprises/logos',
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
