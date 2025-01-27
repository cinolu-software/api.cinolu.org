import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Authorization } from '../../../shared/decorators/rights.decorators';
import { CurrentUser } from '../../../shared/decorators/user.decorator';
import { RoleEnum } from '../../../shared/enums/roles.enum';
import { User } from '../../../users/entities/user.entity';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';

@Controller('project-applications')
@Authorization(RoleEnum.User)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateApplicationDto): Promise<{ data: Application }> {
    return this.applicationsService.create(user, dto);
  }

  @Get()
  @Authorization(RoleEnum.Staff)
  findAll(): Promise<{ data: Application[] }> {
    return this.applicationsService.findAll();
  }

  @Get('project/:project')
  @Authorization(RoleEnum.Staff)
  findByProject(@Param('project') project: string): Promise<{ data: Application[] }> {
    return this.applicationsService.findByProject(project);
  }

  @Get(':id')
  @Authorization(RoleEnum.Staff)
  findOne(@Param('id') id: string): Promise<{ data: Application }> {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto): Promise<{ data: Application }> {
    return this.applicationsService.update(id, dto);
  }

  @Delete(':id')
  @Authorization(RoleEnum.Admin)
  remove(@Param('id') id: string): Promise<void> {
    return this.applicationsService.remove(id);
  }
}
