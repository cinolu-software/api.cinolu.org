import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Rights } from '@core/modules/auth/decorators/rights.decorators';
import { RightsEnum } from '@core/modules/auth/enums/rights.enum';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto, UpdateApplicationDto } from './dto';
import { CurrentUser } from '@core/modules/auth/decorators/user.decorator';
import { User } from '@core/modules/users/users/entities/user.entity';
import { Application } from './entities/application.entity';

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
