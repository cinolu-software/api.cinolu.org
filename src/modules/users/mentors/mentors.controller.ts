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
import { User } from '../entities/user.entity';
import { Mentor } from './entities/mentor.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FilterMentorsDto } from './dto/filter-mentors.dto';
import { UseRoles } from 'nest-access-control';

@Controller('mentors')
export class MentorsController {
  constructor(private mentorsService: MentorsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateMentorDto): Promise<Mentor> {
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
  addCv(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<Mentor> {
    return this.mentorsService.addCv(id, file);
  }

  @Get('filtered')
  @UseRoles({ resource: 'mentors', action: 'read' })
  findFiltered(@Query() dto: FilterMentorsDto): Promise<[Mentor[], number]> {
    return this.mentorsService.findFiltered(dto);
  }

  @Patch('approve/:id')
  @UseRoles({ resource: 'mentorApplications', action: 'update' })
  approve(@Param('id') id: string): Promise<Mentor> {
    return this.mentorsService.approve(id);
  }

  @Patch('reject/:id')
  @UseRoles({ resource: 'mentorApplications', action: 'update' })
  reject(@Param('id') id: string): Promise<Mentor> {
    return this.mentorsService.reject(id);
  }

  @Get()
  @UseRoles({ resource: 'mentors', action: 'read' })
  findAll(): Promise<Mentor[]> {
    return this.mentorsService.findAll();
  }

  @Get(':id')
  @UseRoles({ resource: 'mentors', action: 'read' })
  findOne(@Param('id') id: string): Promise<Mentor> {
    return this.mentorsService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'mentors', action: 'update', possession: 'own' })
  update(@Param('id') id: string, @Body() dto: UpdateMentorDto): Promise<Mentor> {
    return this.mentorsService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'mentors', action: 'delete', possession: 'own' })
  remove(@Param('id') id: string): Promise<void> {
    return this.mentorsService.remove(id);
  }
}
