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
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ContactSupportDto } from './dto/contact-support.dto';
import { CheckPolicies } from '../../shared/decorators/check-policy.decorator';
import { Action, AppAbility } from '../casl/casl-ability.factory';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('users')
@CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, User))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('export/csv')
  async exportCSV(@Query() params: FilterUsersDto, @Res() res: Response): Promise<void> {
    await this.usersService.exportCSV(params, res);
  }

  @Post('contact-us')
  @Public()
  async contactUs(@Body() dto: ContactSupportDto): Promise<void> {
    await this.usersService.contactUs(dto);
  }

  @Post('')
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Get('')
  findAll(@Query() params: FilterUsersDto): Promise<[User[], number]> {
    return this.usersService.findAll(params);
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Patch(':id')
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
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
