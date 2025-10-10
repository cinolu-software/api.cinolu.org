import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IndicatorsService } from './indicators.service';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import { UseRoles } from 'nest-access-control';
import { Indicator } from './entities/indicator.entity';

@Controller('indicators')
export class IndicatorsController {
  constructor(private indicatorsService: IndicatorsService) {}

  @Post('event/:id')
  @UseRoles({ resource: 'indicators', action: 'create' })
  createForEvent(@Param('id') id: string, @Body() dto: CreateIndicatorDto[]): Promise<Indicator[]> {
    return this.indicatorsService.createForEvent(id, dto);
  }

  @Post('project/:id')
  @UseRoles({ resource: 'indicators', action: 'create' })
  createForProject(@Param('id') id: string, @Body() dto: CreateIndicatorDto[]): Promise<Indicator[]> {
    return this.indicatorsService.createForProject(id, dto);
  }

  @Patch(':id')
  @UseRoles({ resource: 'indicators', action: 'update' })
  update(@Param('id') id: string, @Body() dto: UpdateIndicatorDto): Promise<Indicator> {
    return this.indicatorsService.update(id, dto);
  }

  @Delete(':id')
  @UseRoles({ resource: 'indicators', action: 'delete' })
  remove(@Param('id') id: string): Promise<void> {
    return this.indicatorsService.remove(id);
  }
}
