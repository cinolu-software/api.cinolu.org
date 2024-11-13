import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { Public } from '../auth/decorators/public.decorator';
import AddDetailsDto from './dto/add-details.dto';
import { Roles } from 'src/modules/core/access-control/decorators/roles.decorators';
import { RolesEnum } from 'src/modules/core/access-control/enums/roles.enum';

@Controller('users')
@Roles(RolesEnum.Staff)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  findAll(): Promise<{ data: User[] }> {
    return this.userService.findAll();
  }

  @Post('add-details')
  @Roles(RolesEnum.User)
  addDetail(@CurrentUser() user: User, dto: AddDetailsDto): Promise<{ data: User }> {
    return this.userService.addDetails(user, dto);
  }

  @Get('coachs')
  @Public()
  @Roles(RolesEnum.Guest)
  findCoachs(): Promise<{ data: User[] }> {
    return this.userService.findCoachs();
  }

  @Get('staff')
  @Public()
  @Roles(RolesEnum.Guest)
  findStaff(): Promise<{ data: User[] }> {
    return this.userService.findStaff();
  }

  @Get('admins')
  @Public()
  findAdmins(): Promise<{ data: User[] }> {
    return this.userService.findAdmins();
  }

  @Get('users')
  findUsers(): Promise<{ data: User[] }> {
    return this.userService.findUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: User }> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<{ data: User }> {
    return this.userService.update(id, updateUserDto);
  }

  @Post('image-profile')
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
  uploadImage(@CurrentUser() user: User, @UploadedFile() file: Express.Multer.File): Promise<{ data: User }> {
    return this.userService.uploadImage(user, file);
  }

  @Delete(':id')
  @Roles(RolesEnum.Admin)
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
