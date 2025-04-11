import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { RoleEnum } from 'src/shared/enums/roles.enum';
import { Auth } from 'src/shared/decorators/auth.decorators';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
@Auth(RoleEnum.Staff)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @Auth(RoleEnum.User)
  create(@Body() dto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationsService.create(dto);
  }

  @Get('category-counts')
  @Auth(RoleEnum.Guest)
  getCategoryCountsOnly(): Promise<{ total: number; [key: string]: number }> {
    return this.organizationsService.getCategoryCountsOnly();
  }

  @Get('approve/:id')
  @Auth(RoleEnum.Staff)
  approve(@Param('id') id: string): Promise<Organization> {
    return this.organizationsService.approve(id);
  }

  @Get('reject/:id')
  @Auth(RoleEnum.Staff)
  reject(@Param('id') id: string): Promise<Organization> {
    return this.organizationsService.reject(id);
  }

  @Get()
  @Auth(RoleEnum.Guest)
  findAll(): Promise<Organization[]> {
    return this.organizationsService.findAll();
  }

  @Get('category/:category')
  @Auth(RoleEnum.Guest)
  findByCategory(@Param('category') category: string): Promise<Organization[]> {
    return this.organizationsService.findByCategory(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationsService.findOne(id);
  }

  @Post('add-logo/:id')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './uploads/members',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addLogo(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Organization> {
    return this.organizationsService.addLogo(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto): Promise<Organization> {
    return this.organizationsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.organizationsService.remove(id);
  }
}
