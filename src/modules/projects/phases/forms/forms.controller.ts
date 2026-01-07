import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';
import { Public } from '@/core/auth/decorators/public.decorator';
import { FormsService } from './forms.service';
import { CreatePhaseFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { PhaseForm } from './entities/form.entity';

@Controller('forms')
export class FormsController {
  constructor(private phaseFormsService: FormsService) {}

  @Post()
  @UseRoles({ resource: 'projects', action: 'create' })
  create(@Body() dto: CreatePhaseFormDto): Promise<PhaseForm> {
    return this.phaseFormsService.create(dto);
  }

  @Get('phase/:phaseId')
  @Public()
  findByPhase(@Param('phaseId') phaseId: string): Promise<PhaseForm[]> {
    return this.phaseFormsService.findByPhase(phaseId);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<PhaseForm> {
    return this.phaseFormsService.findOne(id);
  }

  @Patch(':id')
  @UseRoles({ resource: 'projects', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateFormDto): Promise<PhaseForm> {
    return this.phaseFormsService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'projects', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.phaseFormsService.remove(id);
  }
}
