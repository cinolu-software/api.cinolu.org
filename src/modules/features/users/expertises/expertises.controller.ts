import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpertisesService } from './expertises.service';
import { CreateExpertiseDto } from './dto/create-expertise.dto';
import { UpdateExpertiseDto } from './dto/update-expertise.dto';
import { Expertise } from './entities/expertise.entity';
import { Public } from '../../../core/auth/decorators/public.decorator';
import { Roles } from '../../../core/access-control/decorators/roles.decorators';
import { RolesEnum } from '../../../core/access-control/enums/roles.enum';

@Controller('user-expertises')
@Roles(RolesEnum.Staff)
export class ExpertisesController {
  constructor(private readonly expertisesService: ExpertisesService) {}

  @Post()
  create(@Body() createExpertiseDto: CreateExpertiseDto): Promise<{ data: Expertise }> {
    return this.expertisesService.create(createExpertiseDto);
  }

  @Get()
  @Public()
  @Roles(RolesEnum.Guest)
  findAll(): Promise<{ data: Expertise[] }> {
    return this.expertisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Expertise }> {
    return this.expertisesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExpertiseDto): Promise<{ data: Expertise }> {
    return this.expertisesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.expertisesService.remove(id);
  }
}
