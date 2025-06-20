import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { Enterprise } from './entities/enterprise.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('enterprises')
export class EnterprisesController {
  constructor(private enterprisesService: EnterprisesService) {}

  @Post()
  create(@Body() dto: CreateEnterpriseDto): Promise<Enterprise> {
    return this.enterprisesService.create(dto);
  }

  @Post('add-logo/:id')
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
    return this.enterprisesService.addLogo(id, file);
  }

  @Post('add-cover/:id')
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
    return this.enterprisesService.addCover(id, file);
  }

  @Get()
  findAll(): Promise<Enterprise[]> {
    return this.enterprisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Enterprise> {
    return this.enterprisesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEnterpriseDto): Promise<Enterprise> {
    return this.enterprisesService.update(id, dto);
  }

  @Delete('logo/:id')
  removeLogo(@Param('id') id: string): Promise<void> {
    return this.enterprisesService.removeLogo(id);
  }

  @Delete('cover/:id')
  removeCover(@Param('id') id: string): Promise<void> {
    return this.enterprisesService.removeCover(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.enterprisesService.remove(id);
  }
}
