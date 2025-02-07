import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { RequirementsService } from './requirements.service';
import { Requirement } from './entities/requirement.entity';
import { Auth } from '../../../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../../../shared/enums/roles.enum';
import { CreateRequirementDto } from '../dto/create-requirement.dto';
import { UpdateRequirementDto } from '../dto/update-requirement.dto';

@Controller('phase-requirements')
@Auth(RoleEnum.Staff)
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  @Get('')
  @Auth(RoleEnum.Guest)
  findAll(): Promise<Requirement[]> {
    return this.requirementsService.findAll();
  }

  @Post('')
  @Auth(RoleEnum.Guest)
  create(@Body() dto: CreateRequirementDto): Promise<Requirement[]> {
    return this.requirementsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRequirementDto): Promise<Requirement> {
    return this.requirementsService.update(id, dto);
  }

  @Post('restore/:id')
  restore(@Param('id') id: string): Promise<Requirement> {
    return this.requirementsService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.requirementsService.remove(id);
  }
}
