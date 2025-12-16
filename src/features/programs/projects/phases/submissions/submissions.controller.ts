import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Submission } from './entities/submission.entity';
import { CurrentUser } from '@/core/auth/decorators/current-user.decorator';
import { User } from '@/features/users/entities/user.entity';

@Controller('form-submissions')
export class SubmissionsController {
  constructor(private formSubmissionsService: SubmissionsService) {}

  @Post()
  @Public()
  create(@CurrentUser() user: User, @Body() dto: CreateSubmissionDto): Promise<Submission> {
    return this.formSubmissionsService.create(user, dto);
  }

  @Get('form/:formId')
  @UseRoles({ resource: 'projects', action: 'read' })
  findByForm(@Param('formId') formId: string): Promise<Submission[]> {
    return this.formSubmissionsService.findByForm(formId);
  }

  @Get('phase/:phaseId')
  @UseRoles({ resource: 'projects', action: 'read' })
  findByPhase(@Param('phaseId') phaseId: string): Promise<Submission[]> {
    return this.formSubmissionsService.findByPhase(phaseId);
  }

  @Get(':id')
  @UseRoles({ resource: 'projects', action: 'read' })
  findOne(@Param('id') id: string): Promise<Submission> {
    return this.formSubmissionsService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'projects', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateSubmissionDto): Promise<Submission> {
    return this.formSubmissionsService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'projects', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.formSubmissionsService.remove(id);
  }
}
