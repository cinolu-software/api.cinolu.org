import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { VenturesService } from '../services/ventures.service';
import { CreateVentureDto } from '../dto/create-venture.dto';
import { Venture } from '../entities/venture.entity';
import { UpdateVentureDto } from '../dto/update-venture.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Authorization } from '../../shared/decorators/rights.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';

@Controller('ventures')
@Authorization(RoleEnum.User)
export class VenturesController {
  constructor(private readonly venturesService: VenturesService) {}

  @Post()
  create(@Body() dto: CreateVentureDto): Promise<{ data: Venture }> {
    return this.venturesService.create(dto);
  }

  @Get()
  @Authorization(RoleEnum.Staff)
  findAll(): Promise<{ data: Venture[] }> {
    return this.venturesService.findAll();
  }

  @Post('publish/:id')
  @Authorization(RoleEnum.Staff)
  publish(@Param('id') id: string): Promise<{ data: Venture }> {
    return this.venturesService.publish(id);
  }

  @Get('find-published')
  @Authorization(RoleEnum.Guest)
  findPublished(): Promise<{ data: Venture[] }> {
    return this.venturesService.findPublished();
  }

  @Get(':id')
  @Authorization(RoleEnum.Guest)
  findOne(@Param('id') id: string): Promise<{ data: Venture }> {
    return this.venturesService.findOne(id);
  }

  @Post('image/:id')
  @UseInterceptors(
    FileInterceptor('thumb', {
      storage: diskStorage({
        destination: './uploads/ventures',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<{ data: Venture }> {
    return this.venturesService.addImage(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVentureDto): Promise<{ data: Venture }> {
    return this.venturesService.update(id, dto);
  }

  @Delete(':id')
  @Authorization(RoleEnum.Staff)
  remove(@Param('id') id: string): Promise<void> {
    return this.venturesService.remove(id);
  }
}
