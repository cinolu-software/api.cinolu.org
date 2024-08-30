import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/app/modules/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/app/modules/auth/enums/role.enum';
import { User } from './entities/user.entity';
import { validateFile } from 'src/app/shared/utils/pipes/file-validation.pipe';
import { CurrentUser } from '../auth/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  @Roles([RoleEnum.Admin])
  create(@Body() createUserDto: CreateUserDto): Promise<{ data: User }> {
    return this.userService.create(createUserDto);
  }

  @Get('')
  findUsers(): Promise<{ data: User[] }> {
    return this.userService.findUsers();
  }

  findAdmins(): Promise<{ data: User[] }> {
    return this.userService.findAdmins();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: User }> {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @Roles([RoleEnum.Admin])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<{ data: User }> {
    return this.userService.update(+id, updateUserDto);
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
  uploadImage(
    @CurrentUser() user: User,
    @UploadedFile(validateFile()) file: Express.Multer.File
  ): Promise<{ data: User }> {
    return this.userService.uploadImage(user, file);
  }

  @Delete('image/:id')
  removeImage(@Param('id') id: string): Promise<{ data: User }> {
    return this.userService.deleteProfileImage(+id);
  }

  @Delete(':id')
  @Roles([RoleEnum.Admin])
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(+id);
  }
}
