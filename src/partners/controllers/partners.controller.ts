import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PartnersService } from '../services/partners.service';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { UpdatePartnerDto } from '../dto/update-partner.dto';
import { Partner } from '../entities/partner.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Authorization } from '../../shared/decorators/rights.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';

@Controller('partners')
@Authorization(RoleEnum.Staff)
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  create(@Body() dto: CreatePartnerDto): Promise<{ data: Partner }> {
    return this.partnersService.create(dto);
  }

  @Get()
  @Authorization(RoleEnum.Guest)
  findAll(): Promise<{ data: Record<string, Partner[]> }> {
    return this.partnersService.findAll();
  }

  @Get(':id')
  @Authorization(RoleEnum.Guest)
  findOne(@Param('id') id: string): Promise<{ data: Partner }> {
    return this.partnersService.findOne(id);
  }

  @Post(':id/profile')
  @UseInterceptors(
    FileInterceptor('thumb', {
      storage: diskStorage({
        destination: './uploads/partners',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addProfile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<{ data: Partner }> {
    return this.partnersService.addProfile(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePartnerDto): Promise<{ data: Partner }> {
    return this.partnersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.partnersService.remove(id);
  }
}
