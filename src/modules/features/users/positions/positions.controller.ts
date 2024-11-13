import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { Position } from './entities/position.entity';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Roles } from '../../../core/access-control/decorators/roles.decorators';
import { RolesEnum } from '../../../core/access-control/enums/roles.enum';
import { Public } from '../../../core/auth/decorators/public.decorator';

@Controller('postions')
@Roles(RolesEnum.Staff)
export class PositionsController {
  constructor(private readonly PostionsService: PositionsService) {}

  @Post()
  create(@Body() createPostionDto: CreatePositionDto): Promise<{ data: Position }> {
    return this.PostionsService.create(createPostionDto);
  }

  @Get()
  @Public()
  @Roles(RolesEnum.Guest)
  findAll(): Promise<{ data: Position[] }> {
    return this.PostionsService.findAll();
  }

  @Get(':id')
  @Public()
  @Roles(RolesEnum.Guest)
  findOne(@Param('id') id: string): Promise<{ data: Position }> {
    return this.PostionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePositionDto): Promise<{ data: Position }> {
    return this.PostionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.PostionsService.remove(id);
  }
}
