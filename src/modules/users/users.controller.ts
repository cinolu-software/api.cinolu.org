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
import { UsersService } from './services/users.service';
import { UsersReferralService } from './services/users-referral.service';
import { UsersExportService } from './services/users-export.service';
import { UserMediaService } from './services/user-media.service';
import CreateUserDto from './dto/create-user.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { Response } from 'express';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { Public } from '@/core/auth/decorators/public.decorator';
import { UseRoles } from 'nest-access-control';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersReferralService: UsersReferralService,
    private readonly usersExportService: UsersExportService,
    private readonly userMediaService: UserMediaService
  ) {}

  @Post('referral-code/generate')
  async generateRefferalLink(@CurrentUser() user: User): Promise<User> {
    return this.usersReferralService.saveRefferalCode(user);
  }

  @Get('staff')
  @UseRoles({ resource: 'users', action: 'read' })
  async findStaff(): Promise<User[]> {
    return this.usersService.findStaff();
  }

  @Get('ambassadors')
  @Public()
  findAmbassadors(): Promise<[User[], number]> {
    return this.usersReferralService.findAmbassadors();
  }

  @Get('ambassadors/:email')
  @Public()
  findAmbassadorByEmail(@Param('email') email: string): Promise<User> {
    return this.usersReferralService.findAmbassadorByEmail(email);
  }

  @Get('me/referred-users')
  async findReferredUsers(@Query('page') page: number, @CurrentUser() user: User): Promise<[User[], number]> {
    return this.usersReferralService.refferedUsers(page, user);
  }

  @Post()
  @UseRoles({ resource: 'users', action: 'create' })
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Get('export/users.csv')
  @UseRoles({ resource: 'exportUsersCSV', action: 'read' })
  async exportCSV(@Query() query: FilterUsersDto, @Res() res: Response): Promise<void> {
    await this.usersExportService.exportCSV(query, res);
  }

  @Get()
  @UseRoles({ resource: 'users', action: 'read' })
  findAll(@Query() query: FilterUsersDto): Promise<[User[], number]> {
    return this.usersService.findAll(query);
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

  @Patch(':userId')
  @UseRoles({ resource: 'users', action: 'update' })
  update(@Param('userId') userId: string, @Body() dto: UpdateUserDto): Promise<User> {
    return this.usersService.update(userId, dto);
  }

  @Post('me/profile-image')
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
    return this.userMediaService.uploadImage(user, file);
  }

  @Delete(':userId')
  @UseRoles({ resource: 'users', action: 'delete' })
  remove(@Param('userId') userId: string): Promise<void> {
    return this.usersService.remove(userId);
  }
}
