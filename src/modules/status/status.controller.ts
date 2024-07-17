import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post('')
  create(@Body() dto: CreateStatusDto): Promise<{ data: Status }> {
    return this.statusService.create(dto);
  }

  @Get('')
  findAll(): Promise<{ data: Status[] }> {
    return this.statusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Status }> {
    return this.statusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStatusDto): Promise<{ data: Status }> {
    return this.statusService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.statusService.remove(+id);
  }
}
