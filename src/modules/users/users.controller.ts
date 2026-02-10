import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create-user.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { Response } from 'express';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { Public } from '@/core/auth/decorators/public.decorator';
import { UseRoles } from 'nest-access-control';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('generate/referralCode')
  async generateRefferalLink(@CurrentUser() user: User): Promise<User> {
    return this.usersService.saveRefferalCode(user);
  }

  @Get('find-staff')
  @UseRoles({ resource: 'users', action: 'read' })
  async findStaff(): Promise<User[]> {
    return this.usersService.findStaff();
  }

  @Get('find-ambassadors')
  @Public()
  findAmbassadors(@Query() params: FilterUsersDto): Promise<[User[], number]> {
    return this.usersService.findAmbassadors(params);
  }

  @Get('find-ambassadors/:email')
  @Public()
  findAmbassadorByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findAmbassadorByEmail(email);
  }

  @Get('find-referred-users')
  async findReferredUsers(@Query('page') page: number, @CurrentUser() user: User): Promise<[User[], number]> {
    return this.usersService.refferedUsers(page, user);
  }

  @Post('')
  @UseRoles({ resource: 'users', action: 'create' })
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Get('export/csv')
  @UseRoles({ resource: 'exportUsersCSV', action: 'read' })
  async exportCSV(@Query() params: FilterUsersDto, @Res() res: Response): Promise<void> {
    await this.usersService.exportCSV(params, res);
  }

  @Get('')
  @UseRoles({ resource: 'users', action: 'read' })
  findAll(@Query() params: FilterUsersDto): Promise<[User[], number]> {
    return this.usersService.findAll(params);
  }

  @Get('entrepreneurs')
  @Public()
  findEntrepreneurs(): Promise<User[]> {
    return this.usersService.findEntrepreneurs();
  }

  @Get(':email')
  @Public()
  findOneByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Patch(':id')
  @UseRoles({ resource: 'users', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, dto);
  }

  @Post('image-profile')
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: diskStorage({
        destination: './uploads/profiles',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  uploadImage(@CurrentUser() user: User, @UploadedFile() file: Express.Multer.File): Promise<User> {
    return this.usersService.uploadImage(user, file);
  }

  @Delete(':id')
  @UseRoles({ resource: 'users', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
