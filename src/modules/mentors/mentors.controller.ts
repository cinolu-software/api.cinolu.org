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
import { MentorsService } from './services/mentors.service';
import { MentorMediaService } from './services/mentor-media.service';
import { MentorRequestDto } from './dto/mentor-request.dto';
import { UpdateMentorRequestDto } from './dto/update-mentor-request.dto';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { MentorProfile } from './entities/mentor.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { createDiskUploadOptions } from '@/core/helpers/upload.helper';
import { FilterMentorsDto } from './dto/filter-mentors.dto';
import { UseRoles } from 'nest-access-control';
import { User } from '@/modules/users/entities/user.entity';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';

@Controller('mentors')
export class MentorsController {
  constructor(
    private readonly mentorsService: MentorsService,
    private readonly mentorMediaService: MentorMediaService
  ) {}

  @Post()
  submitRequest(@CurrentUser() user: User, @Body() dto: MentorRequestDto): Promise<MentorProfile> {
    return this.mentorsService.submitRequest(user, dto);
  }

  @Post('users')
  @UseRoles({ resource: 'mentorApplications', action: 'update' })
  create(@Body() dto: CreateMentorDto): Promise<MentorProfile> {
    return this.mentorsService.create(dto);
  }

  @Patch('users/:mentorId')
  @UseRoles({ resource: 'mentorApplications', action: 'update' })
  updateMentor(@Param('mentorId') mentorId: string, @Body() dto: UpdateMentorDto): Promise<MentorProfile> {
    return this.mentorsService.updateMentor(mentorId, dto);
  }

  @Post(':mentorId/cv')
  @UseRoles({ resource: 'mentorApplications', action: 'update' })
  @UseInterceptors(FileInterceptor('cv', createDiskUploadOptions('./uploads/mentors/cvs')))
  addCv(@Param('mentorId') mentorId: string, @UploadedFile() file: Express.Multer.File): Promise<MentorProfile> {
    return this.mentorMediaService.addCv(mentorId, file);
  }

  @Get('paginated')
  @UseRoles({ resource: 'mentors', action: 'read' })
  findPaginated(@Query() query: FilterMentorsDto): Promise<[MentorProfile[], number]> {
    return this.mentorsService.findFiltered(query);
  }

  @Patch(':mentorId/approve')
  @UseRoles({ resource: 'mentorApplications', action: 'update' })
  approve(@Param('mentorId') mentorId: string): Promise<MentorProfile> {
    return this.mentorsService.approve(mentorId);
  }

  @Patch(':mentorId/reject')
  @UseRoles({ resource: 'mentorApplications', action: 'update' })
  reject(@Param('mentorId') mentorId: string): Promise<MentorProfile> {
    return this.mentorsService.reject(mentorId);
  }

  @Get('me')
  findUserProfile(@CurrentUser() user: User): Promise<MentorProfile[]> {
    return this.mentorsService.findUserProfile(user);
  }

  @Get()
  @UseRoles({ resource: 'mentors', action: 'read' })
  findAll(): Promise<MentorProfile[]> {
    return this.mentorsService.findAll();
  }

  @Get(':mentorId')
  @UseRoles({ resource: 'mentors', action: 'read' })
  findOne(@Param('mentorId') mentorId: string): Promise<MentorProfile> {
    return this.mentorsService.findOne(mentorId);
  }

  @Patch(':mentorId')
  @UseRoles({ resource: 'mentors', action: 'update', possession: 'own' })
  update(@Param('mentorId') mentorId: string, @Body() dto: UpdateMentorRequestDto): Promise<MentorProfile> {
    return this.mentorsService.update(mentorId, dto);
  }

  @Delete(':mentorId')
  @UseRoles({ resource: 'mentors', action: 'delete', possession: 'own' })
  remove(@Param('mentorId') mentorId: string): Promise<void> {
    return this.mentorsService.remove(mentorId);
  }
}
