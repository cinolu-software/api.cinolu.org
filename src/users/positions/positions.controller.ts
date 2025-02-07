import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { Position } from './entities/position.entity';
import { Auth } from '../../shared/decorators/auth.decorators';
import { RoleEnum } from '../../shared/enums/roles.enum';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('positions')
@Auth(RoleEnum.Staff)
export class PositionsController {
  constructor(private readonly PostionsService: PositionsService) {}

  @Post()
  create(@Body() createPostionDto: CreatePositionDto): Promise<Position> {
    return this.PostionsService.create(createPostionDto);
  }

  @Get()
  @Auth(RoleEnum.Guest)
  findAll(): Promise<Position[]> {
    return this.PostionsService.findAll();
  }

  @Get(':id')
  @Auth(RoleEnum.Guest)
  findOne(@Param('id') id: string): Promise<Position> {
    return this.PostionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePositionDto): Promise<Position> {
    return this.PostionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.PostionsService.remove(id);
  }
}
