import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { VenturesService } from './ventures.service';
import { CreateVentureDto } from './dto/create-venture.dto';
import { Venture } from './entities/venture.entity';
import { UpdateVentureDto } from './dto/update-venture.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from '../shared/decorators/auth.decorators';
import { RoleEnum } from '../shared/enums/roles.enum';
import { CurrentUser } from '../shared/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('ventures')
@Auth(RoleEnum.User)
export class VenturesController {
  constructor(private readonly venturesService: VenturesService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateVentureDto): Promise<Venture> {
    return this.venturesService.create(user, dto);
  }

  @Get()
  @Auth(RoleEnum.Staff)
  findAll(): Promise<Venture[]> {
    return this.venturesService.findAll();
  }

  @Post('publish/:id')
  @Auth(RoleEnum.Staff)
  publish(@Param('id') id: string): Promise<Venture> {
    return this.venturesService.publish(id);
  }

  @Get('find-by-user')
  @Auth(RoleEnum.Guest)
  findByUser(@CurrentUser() user: User): Promise<Venture[]> {
    return this.venturesService.findByUser(user);
  }

  @Get('find-published')
  @Auth(RoleEnum.Guest)
  findPublished(): Promise<Venture[]> {
    return this.venturesService.findPublished();
  }

  @Get(':id')
  @Auth(RoleEnum.Guest)
  findOne(@Param('id') id: string): Promise<Venture> {
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
  addImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Venture> {
    return this.venturesService.addImage(id, file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVentureDto): Promise<Venture> {
    return this.venturesService.update(id, dto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Staff)
  remove(@Param('id') id: string): Promise<void> {
    return this.venturesService.remove(id);
  }
}
