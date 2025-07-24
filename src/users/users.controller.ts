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
import { Auth } from '../shared/decorators/auth.decorators';
import { CurrentUser } from '../shared/decorators/user.decorator';
import { RoleEnum } from '../shared/enums/roles.enum';
import { UsersService } from './users.service';
import CreateUserDto from './dto/create-user.dto';
import { QueryParams } from './utils/types/query-params.type';
import { Response } from 'express';

@Controller('users')
@Auth(RoleEnum.Staff)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('export/csv')
  async exportAllToCSV(@Query() queryParams: QueryParams, @Res() res: Response): Promise<void> {
    await this.usersService.exportAllToCSV(queryParams, res);
  }

  @Post('')
  @Auth(RoleEnum.Staff)
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Get('')
  findAll(@Query() queryParams: QueryParams): Promise<[User[], number]> {
    return this.usersService.findAll(queryParams);
  }

  @Get(':email')
  findOne(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
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
    return this.usersService.uploadImage(user, file);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
