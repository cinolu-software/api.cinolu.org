import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApplicationsService } from '../services/application.service';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { CurrentUser } from '../../shared/decorators/user.decorator';
import { User } from '../../users/entities/user.entity';
import { CallApplication } from '../entities/application.entity';

@Controller('call-applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateApplicationDto): Promise<{ data: CallApplication }> {
    return this.applicationsService.create(user, dto);
  }

  @Get()
  findAll(): Promise<{ data: CallApplication[] }> {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: CallApplication }> {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto): Promise<{ data: CallApplication }> {
    return this.applicationsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.applicationsService.remove(id);
  }
}
