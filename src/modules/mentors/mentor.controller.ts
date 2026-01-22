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
import { MentorsService } from './mentors.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { MentorProfile } from './entities/mentor.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FilterMentorsDto } from './dto/filter-mentors.dto';
import { UseRoles } from 'nest-access-control';
import { User } from '../users/entities/user.entity';

@Controller('mentors')
export class MentorsController {
  constructor(private mentorsService: MentorsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateMentorDto): Promise<MentorProfile> {
    return this.mentorsService.create(user, dto);
  }

  @Post('add-cv/:id')
  @UseRoles({ resource: 'addCV', action: 'update', possession: 'own' })
  @UseInterceptors(
    FileInterceptor('cv', {
      storage: diskStorage({
        destination: './uploads/mentors/cvs',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  addCv(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<MentorProfile> {
    return this.mentorsService.addCv(id, file);
  }

  @Get('filtered')
  @UseRoles({ resource: 'mentorsProfiles', action: 'read' })
  findFiltered(@Query() dto: FilterMentorsDto): Promise<[MentorProfile[], number]> {
    return this.mentorsService.findFiltered(dto);
  }

  @Patch('approve/:id')
  @UseRoles({ resource: 'mentorApplications', action: 'update' })
  approve(@Param('id') id: string): Promise<MentorProfile> {
    return this.mentorsService.approve(id);
  }

  @Patch('reject/:id')
  @UseRoles({ resource: 'mentorApplications', action: 'update' })
  reject(@Param('id') id: string): Promise<MentorProfile> {
    return this.mentorsService.reject(id);
  }

  @Get('for-me')
  findForUser(@CurrentUser() user: User): Promise<MentorProfile[]> {
    return this.mentorsService.findForUser(user);
  }

  @Get()
  @UseRoles({ resource: 'mentorsProfiles', action: 'read' })
  findAll(): Promise<MentorProfile[]> {
    return this.mentorsService.findAll();
  }

  @Get(':id')
  @UseRoles({ resource: 'mentorsProfiles', action: 'read' })
  findOne(@Param('id') id: string): Promise<MentorProfile> {
    return this.mentorsService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'mentorsProfiles', action: 'update', possession: 'own' })
  update(@Param('id') id: string, @Body() dto: UpdateMentorDto): Promise<MentorProfile> {
    return this.mentorsService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'mentorsProfiles', action: 'delete', possession: 'own' })
  remove(@Param('id') id: string): Promise<void> {
    return this.mentorsService.remove(id);
  }
}
