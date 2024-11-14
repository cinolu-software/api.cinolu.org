import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { Roles } from '../../../../../core/access-control/decorators/roles.decorators';
import { RolesEnum } from '../../../../../core/access-control/enums/roles.enum';
import { RequirementsService } from './requirements.service';
import { Requirement } from './entities/requirement.entity';
import { CreateRequirementDto, UpdateRequirementDto } from './dto';

@Controller('program-requirements')
@Roles(RolesEnum.Staff)
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  @Get('')
  @Roles(RolesEnum.Guest)
  findAll(): Promise<{ data: Requirement[] }> {
    return this.requirementsService.findAll();
  }

  @Post('')
  create(@Body() dto: CreateRequirementDto): Promise<{ data: Requirement }> {
    return this.requirementsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRequirementDto): Promise<{ data: Requirement }> {
    return this.requirementsService.update(id, dto);
  }

  @Post('restore/:id')
  restore(@Param('id') id: string): Promise<{ data: Requirement }> {
    return this.requirementsService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requirementsService.remove(id);
  }
}
