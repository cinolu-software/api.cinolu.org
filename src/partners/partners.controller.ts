import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner } from './entities/partner.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from '../shared/decorators/auth.decorators';
import { RoleEnum } from '../shared/enums/roles.enum';

@Controller('partners')
@Auth(RoleEnum.Staff)
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  create(@Body() dto: CreatePartnerDto): Promise<Partner> {
    return this.partnersService.create(dto);
  }

  @Get('find-grouped')
  @Auth(RoleEnum.Guest)
  findGrouped(): Promise<Record<string, Partner[]>> {
    return this.partnersService.findGrouped();
  }

  @Get()
  findAll(): Promise<Partner[]> {
    return this.partnersService.findAll();
  }

  @Get(':id')
  @Auth(RoleEnum.Guest)
  findOne(@Param('id') id: string): Promise<Partner> {
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
  addProfile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Partner> {
    return this.partnersService.addProfile(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePartnerDto): Promise<Partner> {
    return this.partnersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.partnersService.remove(id);
  }
}
