import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from '../../../shared/decorators/auth.decorators';
import { CurrentUser } from '../../../shared/decorators/user.decorator';
import { RoleEnum } from '../../../shared/enums/roles.enum';
import { User } from '../../../users/entities/user.entity';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';

@Controller('project-applications')
@Auth(RoleEnum.User)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateApplicationDto): Promise<Application> {
    return this.applicationsService.create(user, dto);
  }

  @Get()
  @Auth(RoleEnum.Staff)
  findAll(): Promise<Application[]> {
    return this.applicationsService.findAll();
  }

  @Get('project/:project')
  @Auth(RoleEnum.Staff)
  findByProject(@Param('project') project: string): Promise<Application[]> {
    return this.applicationsService.findByProject(project);
  }

  @Get(':id')
  @Auth(RoleEnum.Staff)
  findOne(@Param('id') id: string): Promise<Application> {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto): Promise<Application> {
    return this.applicationsService.update(id, dto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string): Promise<void> {
    return this.applicationsService.remove(id);
  }
}
