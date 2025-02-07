import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Auth } from '../shared/decorators/auth.decorators';
import { CurrentUser } from '../shared/decorators/user.decorator';
import { RoleEnum } from '../shared/enums/roles.enum';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create-user.dto';
import { CreateDetailDto } from './details/dto/create-detail.dto';

@Controller('users')
@Auth(RoleEnum.Staff)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('')
  @Auth(RoleEnum.Staff)
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Get('')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('add-details')
  @Auth(RoleEnum.User)
  addDetail(@CurrentUser() user: User, @Body() dto: CreateDetailDto): Promise<User> {
    return this.userService.addDetail(user, dto);
  }

  @Get('coachs')
  @Auth(RoleEnum.Guest)
  findCoachs(): Promise<User[]> {
    return this.userService.findCoachs();
  }

  @Get('staff')
  @Auth(RoleEnum.Guest)
  findStaff(): Promise<User[]> {
    return this.userService.findStaff();
  }

  @Get('admins')
  findAdmins(): Promise<User[]> {
    return this.userService.findAdmins();
  }

  @Get('users')
  findUsers(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Post('image-profile')
  @Auth(RoleEnum.User)
  @UseInterceptors(
    FileInterceptor('thumb', {
      storage: diskStorage({
        destination: './uploads/profiles',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  uploadImage(@CurrentUser() user: User, @UploadedFile() file: Express.Multer.File): Promise<User> {
    return this.userService.uploadImage(user, file);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
