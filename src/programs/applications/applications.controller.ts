import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto, UpdateApplicationDto } from './dto';
import { Application } from './entities/application.entity';
import { Rights } from '../../shared/decorators/rights.decorators';
import { CurrentUser } from '../../shared/decorators/user.decorator';
import { RightsEnum } from '../../shared/enums/rights.enum';
import { User } from '../../users/entities/user.entity';

@Controller('program-applications')
@Rights(RightsEnum.User)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateApplicationDto): Promise<{ data: Application }> {
    return this.applicationsService.create(user, dto);
  }

  @Get()
  @Rights(RightsEnum.Staff)
  findAll(): Promise<{ data: Application[] }> {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  @Rights(RightsEnum.Staff)
  findOne(@Param('id') id: string): Promise<{ data: Application }> {
    return this.applicationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateApplicationDto): Promise<{ data: Application }> {
    return this.applicationsService.update(id, dto);
  }

  @Delete(':id')
  @Rights(RightsEnum.Admin)
  remove(@Param('id') id: string): Promise<void> {
    return this.applicationsService.remove(id);
  }
}
