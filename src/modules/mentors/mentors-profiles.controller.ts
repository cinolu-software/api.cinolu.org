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
import { MentorsProfilesService } from './mentors-profiles.service';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { MentorProfile } from './entities/mentor-profile.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FilterMentorsProfileDto } from './dto/filter-mentors-profiles.dto';
import { UseRoles } from 'nest-access-control';
import { User } from '../users/entities/user.entity';

@Controller('mentors-profiles')
export class MentorsProfileController {
  constructor(private mentorsProfilesService: MentorsProfilesService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateMentorProfileDto): Promise<MentorProfile> {
    return this.mentorsProfilesService.create(user, dto);
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
    return this.mentorsProfilesService.addCv(id, file);
  }

  @Get('filtered')
  @UseRoles({ resource: 'mentorsProfiles', action: 'read' })
  findFiltered(@Query() dto: FilterMentorsProfileDto): Promise<[MentorProfile[], number]> {
    return this.mentorsProfilesService.findFiltered(dto);
  }

  @Patch('approve/:id')
  @UseRoles({ resource: 'mentorApplications', action: 'update' })
  approve(@Param('id') id: string): Promise<MentorProfile> {
    return this.mentorsProfilesService.approve(id);
  }

  @Patch('reject/:id')
  @UseRoles({ resource: 'mentorApplications', action: 'update' })
  reject(@Param('id') id: string): Promise<MentorProfile> {
    return this.mentorsProfilesService.reject(id);
  }

  @Get()
  @UseRoles({ resource: 'mentorsProfiles', action: 'read' })
  findAll(): Promise<MentorProfile[]> {
    return this.mentorsProfilesService.findAll();
  }

  @Get(':id')
  @UseRoles({ resource: 'mentorsProfiles', action: 'read' })
  findOne(@Param('id') id: string): Promise<MentorProfile> {
    return this.mentorsProfilesService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'mentorsProfiles', action: 'update', possession: 'own' })
  update(@Param('id') id: string, @Body() dto: UpdateMentorProfileDto): Promise<MentorProfile> {
    return this.mentorsProfilesService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'mentorsProfiles', action: 'delete', possession: 'own' })
  remove(@Param('id') id: string): Promise<void> {
    return this.mentorsProfilesService.remove(id);
  }
}
