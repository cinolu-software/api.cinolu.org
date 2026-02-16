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
import { User } from '@/modules/users/entities/user.entity';

@Controller('mentors')
export class MentorsController {
  constructor(private readonly mentorsService: MentorsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateMentorDto): Promise<MentorProfile> {
    return this.mentorsService.create(user, dto);
  }

  @Post(':mentorId/cv')
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
  addCv(@Param('mentorId') mentorId: string, @UploadedFile() file: Express.Multer.File): Promise<MentorProfile> {
    return this.mentorsService.addCv(mentorId, file);
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
  findMine(@CurrentUser() user: User): Promise<MentorProfile[]> {
    return this.mentorsService.findForUser(user);
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
  update(@Param('mentorId') mentorId: string, @Body() dto: UpdateMentorDto): Promise<MentorProfile> {
    return this.mentorsService.update(mentorId, dto);
  }

  @Delete(':mentorId')
  @UseRoles({ resource: 'mentors', action: 'delete', possession: 'own' })
  remove(@Param('mentorId') mentorId: string): Promise<void> {
    return this.mentorsService.remove(mentorId);
  }
}
