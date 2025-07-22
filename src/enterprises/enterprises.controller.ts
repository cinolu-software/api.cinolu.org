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
  Query
} from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { Enterprise } from './entities/enterprise.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Auth } from 'src/shared/decorators/auth.decorators';
import { RoleEnum } from 'src/shared/enums/roles.enum';

@Controller('enterprises')
@Auth(RoleEnum.User)
export class EnterprisesController {
  constructor(private enterprisesService: EnterprisesService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateEnterpriseDto): Promise<Enterprise> {
    return this.enterprisesService.create(user, dto);
  }

  @Get('by-slug/:slug')
  @Auth(RoleEnum.Guest)
  findBySlug(@Param('slug') slug: string): Promise<Enterprise> {
    return this.enterprisesService.findBySlug(slug);
  }

  @Get('by-user')
  findByUser(@Query('page') page: string, @CurrentUser() user: User): Promise<[Enterprise[], number]> {
    return this.enterprisesService.findByUser(page, user);
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

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Enterprise> {
    return this.enterprisesService.findOne(id);
  }

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() dto: UpdateEnterpriseDto): Promise<Enterprise> {
    return this.enterprisesService.update(slug, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.enterprisesService.remove(id);
  }
}
