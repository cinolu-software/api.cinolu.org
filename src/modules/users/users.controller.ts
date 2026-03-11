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
import { createDiskUploadOptions } from '@/core/helpers/upload.helper';
import { createCsvUploadOptions } from '@/core/helpers/csv-upload.helper';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UsersReferralService } from './services/users-referral.service';
import { UsersExportService } from './services/users-export.service';
import { UserMediaService } from './services/user-media.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { Response } from 'express';
import { CurrentUser } from 'nestjs-session-auth';
import { Public } from 'nestjs-session-auth';
import { Rbac } from 'nestjs-session-auth';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersReferralService: UsersReferralService,
    private readonly usersExportService: UsersExportService,
    private readonly userMediaService: UserMediaService
  ) {}

  @Post('referral-code/generate')
  async generateReferralLink(@CurrentUser() user: User): Promise<User> {
    return this.usersReferralService.saveReferralCode(user);
  }

  @Get('staff')
  @Rbac({ resource: 'users', action: 'read' })
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
    return this.usersReferralService.referredUsers(page, user);
  }

  @Post()
  @Rbac({ resource: 'users', action: 'create' })
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Get('export/users.csv')
  @Rbac({ resource: 'exportUsersCSV', action: 'read' })
  async exportCSV(@Query() query: FilterUsersDto, @Res() res: Response): Promise<void> {
    await this.usersExportService.exportCSV(query, res);
  }

  @Get('search')
  @Rbac({ resource: 'users', action: 'read' })
  search(@Query('term') term: string): Promise<User[]> {
    return this.usersService.search(term);
  }

  @Post('import-csv')
  @Rbac({ resource: 'users', action: 'create' })
  @UseInterceptors(FileInterceptor('file', createCsvUploadOptions()))
  importCsv(@UploadedFile() file: Express.Multer.File): Promise<void> {
    return this.usersService.importCsv(file);
  }

  @Get()
  @Rbac({ resource: 'users', action: 'read' })
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
  @Rbac({ resource: 'users', action: 'update' })
  update(@Param('userId') userId: string, @Body() dto: UpdateUserDto): Promise<User> {
    return this.usersService.update(userId, dto);
  }

  @Post('me/profile-image')
  @UseInterceptors(FileInterceptor('profile', createDiskUploadOptions('./uploads/profiles')))
  uploadImage(@CurrentUser() user: User, @UploadedFile() file: Express.Multer.File): Promise<User> {
    return this.userMediaService.uploadImage(user, file);
  }

  @Delete('clear')
  @Rbac({ resource: 'users', action: 'delete' })
  clear(): Promise<number> {
    return this.usersService.clear();
  }

  @Delete(':userId')
  @Rbac({ resource: 'users', action: 'delete' })
  remove(@Param('userId') userId: string): Promise<void> {
    return this.usersService.remove(userId);
  }
}
