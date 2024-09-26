import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UsersSeeder } from './users.seeder';
import { Public } from '../auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private useerSeeder: UsersSeeder
  ) {}

  @Public()
  @Get('seed')
  seed(): Promise<{ data: User }> {
    return this.useerSeeder.seed();
  }

  @Post('')
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
  uploadImage(@CurrentUser() user: User, @UploadedFile() file: Express.Multer.File): Promise<{ data: User }> {
    return this.userService.uploadImage(user, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(+id);
  }
}
