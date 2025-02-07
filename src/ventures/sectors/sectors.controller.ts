import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { CreateSectorDto } from '../dto/create-sector.dto';
import { UpdateSectorDto } from '../dto/update-sector.dto';
import { Sector } from './entities/sector.entity';
import { Auth } from '../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';

@Controller('sectors')
@Auth(RoleEnum.User)
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Post()
  @Auth(RoleEnum.Staff)
  create(@Body() dto: CreateSectorDto): Promise<Sector> {
    return this.sectorsService.create(dto);
  }

  @Get()
  findAll(): Promise<Sector[]> {
    return this.sectorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Sector> {
    return this.sectorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSectorDto): Promise<Sector> {
    return this.sectorsService.update(id, dto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string): Promise<void> {
    return this.sectorsService.remove(id);
  }
}
